import { NextResponse } from 'next/server';
import { fetchFromBackend, UNAVAILABLE_STATUS } from '../backend';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await fetchFromBackend('/posts');
  if (result.ok) {
    return NextResponse.json(result.data);
  }
  return NextResponse.json({
    success: false,
    status: UNAVAILABLE_STATUS,
    posts: [],
    message: UNAVAILABLE_STATUS.error,
  });
}
