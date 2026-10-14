import { NextResponse } from 'next/server';
import { fetchFromBackend, UNAVAILABLE_STATUS } from '../backend';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await fetchFromBackend('/status');
  return NextResponse.json(result.ok ? result.data : UNAVAILABLE_STATUS);
}
