import { NextResponse } from 'next/server';
import { getDb } from '../db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name ?? '').toString().trim();
    const phone_number = (body?.phone_number ?? '').toString().trim();
    const email = (body?.email ?? '').toString().trim();
    const course = (body?.course ?? '').toString().trim();

    if (!name || !phone_number || !email || !course) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic validation
    if (phone_number.length > 15) {
      return NextResponse.json({ error: 'Phone number too long' }, { status: 400 });
    }
    if (email.length > 150) {
      return NextResponse.json({ error: 'Email too long' }, { status: 400 });
    }
    if (name.length > 100 || course.length > 150) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const pool = getDb();
    const sql = `INSERT INTO callback_requests (name, phone_number, email, course) VALUES (?, ?, ?, ?)`;
    await pool.execute(sql, [name, phone_number, email, course]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Callback request insert failed', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
