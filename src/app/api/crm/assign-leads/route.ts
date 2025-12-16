import dbConfig from '../../dbConfig';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Assign Leads Request Body:', body);

    const { leadIds, assignee, assigner } = body;

    if (assigner !== 'ramkumar.malothu@nyeras.com') {
      return new Response(JSON.stringify({ message: 'Unauthorized action.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0 || !assignee) {
      return new Response(JSON.stringify({ message: 'Invalid input data.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract employee ID from assignee string like "Kuchala Venkatesh - NY1123"
    const matches = assignee.match(/- (\w+)$/);
    if (!matches || matches.length < 2) {
      return new Response(JSON.stringify({ message: 'Invalid assignee format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const employeeId = matches[1]; // e.g., NY1123

    const connection = await mysql.createConnection(dbConfig);

    // Fetch email of the employee using ID
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT email FROM employees WHERE id = ?',
      [employeeId]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      await connection.end();
      return new Response(JSON.stringify({ message: 'Employee not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const assigneeEmail = rows[0].email;

    // Update leads table with assignedto = assigneeEmail
    const updateQuery = `
      UPDATE leads
      SET assignedto = ?
      WHERE id IN (${leadIds.map(() => '?').join(',')})
    `;

    const values = [assigneeEmail, ...leadIds];

    console.log('Executing query:', updateQuery, values);

    await connection.execute(updateQuery, values);
    await connection.end();

    return new Response(JSON.stringify({ message: 'Leads assigned successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error assigning leads:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to assign leads. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
