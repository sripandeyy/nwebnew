import { NextResponse, unstable_after as after } from 'next/server';
import { getLinkedInConfig } from '../_lib/config';
import { getFeedSnapshot, runSync } from '../_lib/sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { status, posts } = await getFeedSnapshot();

    // Serve the cached feed immediately; refresh from LinkedIn after the response when it is stale.
    // runSync's database claim ensures at most one refresh per interval across all instances.
    if (status.configured && status.authenticated) {
      after(() =>
        runSync(getLinkedInConfig().syncIntervalMs).catch((err) =>
          console.warn('[LinkedIn] Background refresh failed:', (err as Error).message)
        )
      );
    }

    let message: string;
    if (!status.configured) message = 'LinkedIn integration is not configured.';
    else if (!status.authenticated) message = 'LinkedIn integration pending authorization.';
    else if (!status.live) message = 'Authorized; waiting for the first successful LinkedIn API request.';
    else message = `Retrieved ${posts.length} synchronized post(s).`;

    return NextResponse.json({ success: true, status, posts, message });
  } catch (err) {
    console.error('[LinkedIn] Failed to read feed:', (err as Error).message);
    return NextResponse.json(
      { success: false, status: null, posts: [], message: 'LinkedIn feed is temporarily unavailable.' },
      { status: 503 }
    );
  }
}
