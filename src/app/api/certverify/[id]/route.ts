import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dbConfig from '../../dbConfig';

// Ensure Node.js runtime for mysql2 compatibility
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const pathname = new URL(request.url).pathname;
  const rawId = pathname.split('/').pop() || '';
  const id = decodeURIComponent(rawId);

  console.log(`Certificate verification request for ID: ${id}`);

  if (!id) {
    console.error('Error: Missing certificate ID');
    return NextResponse.json(
      { error: 'Certificate ID is required' }, 
      { status: 400 }
    );
  }

  let connection;
  const startTime = Date.now();

  try {
    console.log('Creating database connection...');
    connection = await mysql.createConnection({
      ...dbConfig,
      // Add connection pool settings
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
    });

    console.log('Database connection established. Querying certificate...');
    
    // Try exact match first
    const [rows] = await connection.query<mysql.RowDataPacket[]>(
      'SELECT * FROM certificates WHERE id = ?',
      [id]
    );

    console.log(`Exact match found: ${rows.length} results`);

    // If not found, try alternative ID format (e.g., "NYC1109" -> "NYC 1109")
    let result = rows;
    if (result.length === 0) {
      const altId = id.replace(/^([A-Za-z]+)(\d+)$/, '$1 $2');
      if (altId !== id) {
        console.log(`Trying alternative ID format: "${altId}"`);
        const [altRows] = await connection.query<mysql.RowDataPacket[]>(
          'SELECT * FROM certificates WHERE id = ?',
          [altId]
        );
        console.log(`Alternative match found: ${altRows.length} results`);
        result = altRows;
      }
    }

    if (result.length === 0) {
      console.log('No matching certificate found');
      return NextResponse.json(
        { 
          error: 'Certificate not found',
          id,
          timestamp: new Date().toISOString()
        }, 
        { status: 404 }
      );
    }

    const certificate = result[0];
    console.log('Certificate found:', {
      id: certificate.id,
      name: certificate.name,
      course: certificate.course
    });

    return NextResponse.json(certificate);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('Database connection closed');
      } catch (endError) {
        console.error('Error closing database connection:', endError);
      }
    }
    console.log(`Request processed in ${Date.now() - startTime}ms`);
  }
}
