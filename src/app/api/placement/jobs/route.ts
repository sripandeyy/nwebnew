import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import type { ResultSetHeader } from 'mysql2/promise';
import { errorMessage } from '../../_lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const type = searchParams.get('type');
    const remote = searchParams.get('remote');
    const search = searchParams.get('search');
    const experience = searchParams.get('experience');

    const pool = getDb();
    let query = 'SELECT * FROM placement_jobs WHERE status = "active"';
    const params: string[] = [];

    if (domain && domain !== 'All') {
      query += ' AND domain LIKE ?';
      params.push(`%${domain}%`);
    }
    if (type && type !== 'All') {
      query += ' AND type = ?';
      params.push(type);
    }
    if (remote && remote !== 'All') {
      query += ' AND remote_option = ?';
      params.push(remote);
    }
    if (experience && experience !== 'All') {
      query += ' AND experience LIKE ?';
      params.push(`%${experience}%`);
    }
    if (search) {
      query += ' AND (title LIKE ? OR company LIKE ? OR skills LIKE ? OR description LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ' ORDER BY is_featured DESC, created_at DESC LIMIT 50';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, jobs: rows });
  } catch (err) {
    console.error('Error fetching placement jobs:', err);
    return NextResponse.json(
      { success: false, error: 'Database unavailable', jobs: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      company,
      logo,
      domain,
      type,
      experience,
      location,
      remote_option,
      salary,
      description,
      eligibility,
      skills,
      deadline,
      apply_url,
      is_featured
    } = body;

    if (!title || !company || !domain || !skills || !description) {
      return NextResponse.json({ success: false, error: 'Missing required job fields' }, { status: 400 });
    }

    const pool = getDb();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO placement_jobs 
      (title, company, logo, domain, type, experience, location, remote_option, salary, description, eligibility, skills, deadline, apply_url, is_verified, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [
        title,
        company,
        logo || '/logo.png',
        domain,
        type || 'Full-time',
        experience || 'Fresher / 0-1 Years',
        location || 'Bangalore / Hybrid',
        remote_option || 'Hybrid',
        salary || 'Disclosed upon interview',
        description,
        eligibility || 'Graduates from recognized engineering/management tracks',
        skills,
        deadline || 'Rolling basis',
        apply_url || '#apply-portal',
        is_featured ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true, jobId: result.insertId });
  } catch (err) {
    console.error('Error creating job:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute('UPDATE placement_jobs SET status = "archived" WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
