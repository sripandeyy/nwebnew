import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import { errorMessage } from '../../_lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ success: true, notifications: [] });
    }

    const pool = getDb();
    const [rows] = await pool.query(
      'SELECT * FROM placement_notifications WHERE user_email = ? ORDER BY created_at DESC LIMIT 30',
      [userEmail]
    );

    return NextResponse.json({ success: true, notifications: rows });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    return NextResponse.json({ success: false, error: errorMessage(err), notifications: [] }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { notificationId, userEmail, markAll } = body;

    const pool = getDb();
    if (markAll && userEmail) {
      await pool.execute('UPDATE placement_notifications SET is_read = 1 WHERE user_email = ?', [userEmail]);
    } else if (notificationId) {
      await pool.execute('UPDATE placement_notifications SET is_read = 1 WHERE id = ?', [notificationId]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
