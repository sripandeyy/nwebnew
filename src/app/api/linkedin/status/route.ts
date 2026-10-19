import { NextResponse } from 'next/server';
import { getFeedSnapshot } from '../_lib/sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { status } = await getFeedSnapshot();
    return NextResponse.json(status);
  } catch (err) {
    console.error('[LinkedIn] Failed to read status:', (err as Error).message);
    return NextResponse.json({ error: 'LinkedIn status is temporarily unavailable.' }, { status: 503 });
  }
}
