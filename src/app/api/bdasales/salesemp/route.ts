import mysql from 'mysql2/promise';
import dbConfig from '../../dbConfig';
import { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    if(req.method !== 'GET') {
      return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const connection = await mysql.createConnection(dbConfig);
    const [rows]: [any[], any[]] = await connection.execute('SELECT id, name, email, phone FROM employees WHERE department = "Sales"');
    await connection.end();

    // Modify the name field to be "name-id"
    const modifiedRows = rows.map((row: any) => ({
      name: `${row.name} - ${row.id}`,
      email: row.email,
      phone: row.phone
    }));

    return new Response(JSON.stringify(modifiedRows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve sales data.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
