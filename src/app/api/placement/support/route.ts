import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { errorMessage } from '../../_lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');
    const isAdmin = searchParams.get('admin') === 'true';

    const pool = getDb();
    let query = 'SELECT * FROM placement_support_tickets';
    const params: string[] = [];

    if (!isAdmin) {
      if (!userEmail) return NextResponse.json({ success: true, tickets: [] });
      query += ' WHERE user_email = ?';
      params.push(userEmail);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, tickets: rows });
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    return NextResponse.json({ success: false, error: errorMessage(err), tickets: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, userName, subject, category, message } = body;

    if (!userEmail || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Email, subject, and message required' }, { status: 400 });
    }

    const pool = getDb();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO placement_support_tickets (user_email, user_name, subject, category, message, status)
       VALUES (?, ?, ?, ?, ?, 'Open')`,
      [userEmail, userName || userEmail.split('@')[0], subject, category || 'General Support', message]
    );

    return NextResponse.json({ success: true, ticketId: result.insertId });
  } catch (err) {
    console.error('Error creating support ticket:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketId, status, adminReply } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, error: 'Ticket ID required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute(
      'UPDATE placement_support_tickets SET status = COALESCE(?, status), admin_reply = COALESCE(?, admin_reply) WHERE id = ?',
      [status ?? null, adminReply ?? null, ticketId]
    );

    // Fetch user to notify
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT user_email, subject FROM placement_support_tickets WHERE id = ?', [ticketId]);
    if (rows.length > 0) {
      await pool.execute(
        `INSERT INTO placement_notifications (user_email, title, message, type)
         VALUES (?, ?, ?, 'system')`,
        [
          rows[0].user_email,
          `Career Support Update: Ticket #${ticketId}`,
          `Your support inquiry "${rows[0].subject}" has received an official response from the Placement Cell.`,
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
