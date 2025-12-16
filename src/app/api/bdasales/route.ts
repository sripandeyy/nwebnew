import dbConfig from '../dbConfig'; // MySQL database configuration
import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json();
  const { salesPersonName, amount, date, customerName, customerPhone, status = 'pending' } = body;

  if (!salesPersonName || !amount || !date || !customerName || !customerPhone) {
    return new Response(JSON.stringify({ message: 'Invalid or missing fields.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const validStatuses = ['pending', 'completed', 'rejected'];
  if (!validStatuses.includes(status)) {
    return new Response(JSON.stringify({ message: 'Invalid status.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Create MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Insert data into MySQL
    const query = `
      INSERT INTO bdasales (salesPersonName, amount, date, customerName, customerPhone, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [salesPersonName, amount, date, customerName, customerPhone, status];

    const [] = await connection.execute(query, values);
    await connection.end();

    return new Response(JSON.stringify({ message: 'Sale recorded successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving sale:', error);
    return new Response(JSON.stringify({ message: 'Failed to record sale. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
