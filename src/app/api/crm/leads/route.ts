import dbConfig from '../../dbConfig';
import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const connection = await mysql.createConnection(dbConfig);

    let query: string;
    let params: any[] = [];

    if (email.toLowerCase() === 'ramkumar.malothu@nyeras.com') {
      query = `
        SELECT id, name, email, phone, action, course, date, myaction, notes, assignedto
        FROM leads
      `;
    } else {
      query = `
        SELECT id, name, email, phone, action, course, date, myaction, notes, assignedto
        FROM leads
        WHERE assignedto = ?
      `;
      params = [email];
    }

    const [rows] = await connection.execute(query, params);

    await connection.end();

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch data. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}