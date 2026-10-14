import mysql, { type RowDataPacket } from 'mysql2/promise';
import dbConfig from '../dbConfig';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email parameter is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT id, name FROM employees WHERE email = ?', [email]);
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'No employee found with this email.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve employee data.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
