import dbConfig from '../dbConfig'; // Import your MySQL database configuration
import mysql from 'mysql2/promise';
import { NextRequest } from "next/server"
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { name, email, phone, course } = body;

  // Validate name, email, and phone
  if (
    !name || typeof name !== 'string' || name.trim() === '' ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone || typeof phone !== 'string' || !/^\d{10}$/.test(phone)
  ) {
    return new Response(
      JSON.stringify({ message: 'Invalid data. Ensure all fields are filled correctly.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const now = new Date();
    const timestamp = now.toISOString();
    const date = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    
    const query = `INSERT INTO leads (name, email, phone, timestamp, date, action, message, myaction, notes, course) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, phone, timestamp, date, 'Downloaded Brochure', 'NA', 'Not Reviewed', '', course];
    
    await connection.execute(query, values);
    await connection.end();

    return new Response(JSON.stringify({ message: 'Data saved successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to save data. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
