import { NextResponse } from 'next/server';
import { getDb } from '../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbStatus = 'disconnected';
  let latencyMs: number | null = null;

  try {
    const start = Date.now();
    const pool = getDb();
    await pool.query('SELECT 1');
    latencyMs = Date.now() - start;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: {
      status: dbStatus,
      latencyMs: dbStatus === 'connected' ? latencyMs : null,
    },
  });
}
