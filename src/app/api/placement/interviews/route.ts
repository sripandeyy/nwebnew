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
    let query = 'SELECT * FROM placement_interviews';
    const params: string[] = [];

    if (!isAdmin) {
      if (!userEmail) return NextResponse.json({ success: true, interviews: [] });
      query += ' WHERE user_email = ?';
      params.push(userEmail);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, interviews: rows });
  } catch (err) {
    console.error('Error fetching mock interviews:', err);
    return NextResponse.json({ success: false, error: errorMessage(err), interviews: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, userName, type, scheduledTime, mentorName } = body;

    if (!userEmail || !userName || !type || !scheduledTime) {
      return NextResponse.json({ success: false, error: 'User info, interview type, and date/time required' }, { status: 400 });
    }

    const pool = getDb();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO placement_interviews 
      (user_email, user_name, type, mentor_name, scheduled_time, status, meeting_link, strengths, improvements, action_items)
      VALUES (?, ?, ?, ?, ?, 'Requested', 'https://meet.google.com/nye-mock-prep', 
      'Awaiting live evaluation by mentor', 'Pending session completion', 'Review domain syllabus, prepare self-introduction & project pitch')`,
      [
        userEmail,
        userName,
        type,
        mentorName || 'Senior Technical Mentor / Academic Lead',
        scheduledTime,
      ]
    );

    // Notification
    try {
      await pool.execute(
        `INSERT INTO placement_notifications (user_email, title, message, type)
         VALUES (?, ?, ?, 'interview')`,
        [
          userEmail,
          'Mock Interview Requested',
          `Your 1:1 ${type} session has been requested for ${scheduledTime}. A mentor will confirm your slot shortly.`,
        ]
      );
    } catch {}

    return NextResponse.json({ success: true, interviewId: result.insertId });
  } catch (err) {
    console.error('Error booking interview:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { interviewId, status, score, strengths, improvements, actionItems, meetingLink, mentorName } = body;

    if (!interviewId) {
      return NextResponse.json({ success: false, error: 'Interview ID required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute(
      `UPDATE placement_interviews 
       SET status = COALESCE(?, status),
           score = COALESCE(?, score),
           strengths = COALESCE(?, strengths),
           improvements = COALESCE(?, improvements),
           action_items = COALESCE(?, action_items),
           meeting_link = COALESCE(?, meeting_link),
           mentor_name = COALESCE(?, mentor_name)
       WHERE id = ?`,
      [
        status ?? null,
        score ?? null,
        strengths ?? null,
        improvements ?? null,
        actionItems ?? null,
        meetingLink ?? null,
        mentorName ?? null,
        interviewId
      ]
    );

    // Fetch user email to notify
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT user_email, type FROM placement_interviews WHERE id = ?', [interviewId]);
    if (rows.length > 0) {
      const email = rows[0].user_email;
      await pool.execute(
        `INSERT INTO placement_notifications (user_email, title, message, type)
         VALUES (?, ?, ?, 'feedback')`,
        [
          email,
          `Mock Interview Update: ${rows[0].type}`,
          `Your mock interview has been updated to "${status || 'Evaluated'}". Mentor feedback and action items are now available in your dashboard.`,
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating interview:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
