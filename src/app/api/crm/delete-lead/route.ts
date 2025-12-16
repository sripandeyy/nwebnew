import dbConfig from '../../dbConfig';
import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: 'Lead ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM leads WHERE id = ?', [id]);
    await connection.end();

    return new Response(JSON.stringify({ message: 'Lead deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to delete lead. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
