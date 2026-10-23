import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { isLinkedInAdmin } from '../_lib/adminAccess';
import { getFeedSnapshot, MANUAL_SYNC_COOLDOWN_MS, runSync } from '../_lib/sync';

export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const suppliedSecret =
    req.headers.get('x-cron-secret') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    req.nextUrl.searchParams.get('cron_secret');

  if (cronSecret && suppliedSecret) {
    const suppliedBuf = Buffer.from(suppliedSecret);
    const expectedBuf = Buffer.from(cronSecret);
    if (suppliedBuf.length === expectedBuf.length && timingSafeEqual(suppliedBuf, expectedBuf)) {
      return true;
    }
  }

  return isLinkedInAdmin(req);
}

async function handleSync(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Provide x-cron-secret header or log in as admin.' },
      { status: 401 }
    );
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

    // Idempotent: when cooldown is active, return HTTP 200 so cron runners succeed
    if (outcome.reason === 'cooldown') {
      const seconds = Math.ceil((outcome.cooldownRemainingMs || MANUAL_SYNC_COOLDOWN_MS) / 1000);
      return NextResponse.json(
        {
          success: true,
          idempotent: true,
          message: `Sync skipped: cooldown active (${seconds}s remaining).`,
          status,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          outcome.reason === 'unconfigured'
            ? 'LinkedIn credentials are not configured.'
            : 'LinkedIn is not connected yet. Use Connect LinkedIn in the admin portal first.',
        status,
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, message: (err as Error).message }, { status: 500 });
  }
}

/**
 * Both GET and POST are supported for hPanel curl cron jobs:
 * curl -s -H "x-cron-secret: $CRON_SECRET" https://nyeras.com/api/linkedin/sync
 */
export async function GET(req: NextRequest) {
  return handleSync(req);
}

export async function POST(req: NextRequest) {
  return handleSync(req);
}
