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
    let query = `
      SELECT a.*, j.title as job_title, j.company as job_company, j.location as job_location, j.type as job_type, j.salary as job_salary
      FROM placement_applications a
      JOIN placement_jobs j ON a.job_id = j.id
    `;
    const params: string[] = [];

    if (!isAdmin) {
      if (!userEmail) {
        return NextResponse.json({ success: true, applications: [] });
      }
      query += ' WHERE a.user_email = ?';
      params.push(userEmail);
    }

    query += ' ORDER BY a.applied_at DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, applications: rows });
  } catch (err) {
    console.error('Error fetching applications:', err);
    return NextResponse.json({ success: false, error: errorMessage(err), applications: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, userEmail, userName, resumeName, resumeUrl } = body;

    if (!jobId || !userEmail || !userName) {
      return NextResponse.json({ success: false, error: 'Job ID, user email, and user name required' }, { status: 400 });
    }

    const pool = getDb();

    // Check duplicate application
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM placement_applications WHERE job_id = ? AND user_email = ?',
      [jobId, userEmail]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'You have already applied for this opportunity.' },
        { status: 409 }
      );
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO placement_applications (job_id, user_email, user_name, resume_name, resume_url, status)
       VALUES (?, ?, ?, ?, ?, 'Applied')`,
      [jobId, userEmail, userName, resumeName || 'Default Verified Resume', resumeUrl || '']
    );

    // Notify user in platform
    try {
      await pool.execute(
        `INSERT INTO placement_notifications (user_email, title, message, type)
         VALUES (?, ?, ?, 'application')`,
        [
          userEmail,
          'Application Submitted',
          `Your application for Opportunity #${jobId} has been successfully submitted and forwarded to our Placement Coordination Cell.`,
        ]
      );
    } catch {
      // Non-fatal
    }

    return NextResponse.json({ success: true, applicationId: result.insertId });
  } catch (err) {
    console.error('Error submitting application:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId, status, notes } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, error: 'Application ID and status required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute(
      'UPDATE placement_applications SET status = ?, notes = ? WHERE id = ?',
      [status, notes || '', applicationId]
    );

    // Fetch user email to notify them
    const [appRows] = await pool.execute<RowDataPacket[]>('SELECT user_email, job_id FROM placement_applications WHERE id = ?', [applicationId]);
    if (appRows.length > 0) {
      const email = appRows[0].user_email;
      await pool.execute(
        `INSERT INTO placement_notifications (user_email, title, message, type)
         VALUES (?, ?, ?, 'application')`,
        [
          email,
          `Application Status Updated: ${status}`,
          `Your recruitment application for Job #${appRows[0].job_id} status has been updated to "${status}". Notes: ${notes || 'Proceed to interview preparation.'}`,
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating application status:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
