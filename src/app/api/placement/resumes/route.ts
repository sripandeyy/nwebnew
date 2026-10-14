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

    if (!userEmail && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    const pool = getDb();
    let query = 'SELECT id, user_email, title, version, file_name, file_size, feedback, score, is_primary, uploaded_at FROM placement_resumes';
    const params: string[] = [];

    if (!isAdmin && userEmail) {
      query += ' WHERE user_email = ?';
      params.push(userEmail);
    }

    query += ' ORDER BY uploaded_at DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, resumes: rows });
  } catch (err) {
    console.error('Error fetching resumes:', err);
    return NextResponse.json({ success: false, error: errorMessage(err), resumes: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, title, version, fileName, fileSize, fileData, isPrimary } = body;

    if (!userEmail || !fileName) {
      return NextResponse.json({ success: false, error: 'Email and filename required' }, { status: 400 });
    }

    const pool = getDb();

    // Check version count for user
    const [existing] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as cnt FROM placement_resumes WHERE user_email = ?', [userEmail]);
    const nextVer = version || `v${Number(existing[0]?.cnt || 0) + 1}.0`;

    if (isPrimary) {
      await pool.execute('UPDATE placement_resumes SET is_primary = 0 WHERE user_email = ?', [userEmail]);
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO placement_resumes (user_email, title, version, file_name, file_size, file_data, feedback, score, is_primary)
       VALUES (?, ?, ?, ?, ?, ?, 'Pending Senior Mentor Review: Structure, ATS compatibility, and technical keyword density are being evaluated.', 88, ?)`,
      [
        userEmail,
        title || `${fileName.replace(/\.[^/.]+$/, '')} (Target Tech Track)`,
        nextVer,
        fileName,
        fileSize || '145 KB',
        fileData || 'data:application/pdf;base64,demo',
        isPrimary ? 1 : (existing[0]?.cnt === 0 ? 1 : 0),
      ]
    );

    return NextResponse.json({ success: true, resumeId: result.insertId });
  } catch (err) {
    console.error('Error saving resume:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeId, feedback, score, isPrimary, userEmail } = body;

    if (!resumeId) {
      return NextResponse.json({ success: false, error: 'Resume ID required' }, { status: 400 });
    }

    const pool = getDb();

    if (isPrimary && userEmail) {
      await pool.execute('UPDATE placement_resumes SET is_primary = 0 WHERE user_email = ?', [userEmail]);
      await pool.execute('UPDATE placement_resumes SET is_primary = 1 WHERE id = ?', [resumeId]);
    }

    if (feedback !== undefined || score !== undefined) {
      await pool.execute(
        'UPDATE placement_resumes SET feedback = COALESCE(?, feedback), score = COALESCE(?, score) WHERE id = ?',
        [feedback ?? null, score ?? null, resumeId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userEmail = searchParams.get('email');

    if (!id || !userEmail) {
      return NextResponse.json({ success: false, error: 'ID and user email required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute('DELETE FROM placement_resumes WHERE id = ? AND user_email = ?', [id, userEmail]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
