import { getDb } from '../../db'; 
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    if(req.method !== 'GET') {
      return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const connection = getDb();
    const [rows] = await connection.execute('SELECT * FROM bdasales ORDER BY createdAt DESC');
    console.log(rows);
    // connection returned to pool

    return new Response(JSON.stringify(rows), {
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