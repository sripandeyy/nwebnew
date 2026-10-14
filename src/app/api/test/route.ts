import mysql from 'mysql2/promise';
import dbConfig from '../dbConfig';

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM leads');

    return new Response(JSON.stringify({ rows }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch sales data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    if (connection) await connection.end();
  }
}
