import { NextRequest, NextResponse } from 'next/server';
import { isLinkedInAdmin } from '../_lib/adminAccess';
import { getFeedSnapshot, MANUAL_SYNC_COOLDOWN_MS, runSync } from '../_lib/sync';

export const dynamic = 'force-dynamic';

/**
 * POST /api/linkedin/sync (admin only)
 * Forces a refresh, rate limited so it cannot be used to exhaust the LinkedIn API quota.
 */
export async function POST(req: NextRequest) {
  if (!isLinkedInAdmin(req)) {
    return NextResponse.json({ success: false, message: 'Admin sign-in required.' }, { status: 401 });
  }

  try {
    const outcome = await runSync(MANUAL_SYNC_COOLDOWN_MS);
    const { status } = await getFeedSnapshot();

    if (outcome.status === 'synced') {
      return NextResponse.json({
        success: true,
        message: `Sync completed: ${outcome.result.newCount} new post(s), ${outcome.result.total} total.`,
        result: outcome.result,
        status,
      });
    }
    if (outcome.status === 'failed') {
      return NextResponse.json({ success: false, message: outcome.error, status }, { status: 502 });
    }
    if (outcome.reason === 'cooldown') {
      const seconds = Math.ceil((outcome.cooldownRemainingMs || MANUAL_SYNC_COOLDOWN_MS) / 1000);
      return NextResponse.json(
        { success: false, message: `Please wait ${seconds}s before triggering another sync.`, status },
        { status: 429 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message:
          outcome.reason === 'unconfigured'
            ? 'LinkedIn credentials are not configured.'
            : 'LinkedIn is not connected yet. Use Connect LinkedIn first.',
        status,
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, message: (err as Error).message }, { status: 500 });
  }
}
