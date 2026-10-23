import { getDb } from '../db';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawBody = await req.text(); // Raw body as string

    // Connect to MySQL
    const connection = getDb();

    // Insert raw JSON data into 'bdasales' table (adjust table/column names as needed)
    const query = `
      INSERT INTO razorpay_webhooks (payload, createdAt)
      VALUES (?, NOW())
    `;
    await connection.execute(query, [rawBody]);

    // connection returned to pool

    return new Response(JSON.stringify({ message: 'Data saved successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving webhook payload:', error);
    return new Response(JSON.stringify({ message: 'Failed to save data.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
