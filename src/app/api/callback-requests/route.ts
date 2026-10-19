import { NextResponse } from 'next/server';
import { getDb } from '../db';
import { appendCallbackToGoogleSheet } from '../_lib/googleSheet';

let tableReady: Promise<void> | null = null;

function ensureTable(): Promise<void> {
  if (!tableReady) {
    tableReady = getDb()
      .query(
        `CREATE TABLE IF NOT EXISTS callback_requests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone_number VARCHAR(15) NOT NULL,
          email VARCHAR(150) NOT NULL,
          course VARCHAR(150) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_callback_phone (phone_number),
          INDEX idx_callback_email (email),
          INDEX idx_callback_created (created_at)
        ) DEFAULT CHARSET=utf8mb4`
      )
      .then(() => undefined)
      .catch((err) => {
        tableReady = null;
        throw err;
      });
  }
  return tableReady;
}

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

    let sheetSaved = false;
    let dbSaved = false;

    // 1. Sync to Google Spreadsheet
    try {
      const sheetRes = await appendCallbackToGoogleSheet({
        name,
        email,
        phone: phone_number,
        course,
        source: 'Course Page Callback Request',
      });
      sheetSaved = Boolean(sheetRes?.success);
    } catch (sheetError) {
      console.warn('[CallbackRequests] Google Sheet append error:', sheetError);
    }

    // 2. Store in MySQL callback_requests
    try {
      await ensureTable();
      const pool = getDb();
      const sql = `INSERT INTO callback_requests (name, phone_number, email, course) VALUES (?, ?, ?, ?)`;
      await pool.execute(sql, [name, phone_number, email, course]);
      dbSaved = true;
    } catch (dbError) {
      console.warn('[CallbackRequests] MySQL insert error:', dbError);
    }

    if (sheetSaved || dbSaved) {
      return NextResponse.json({ success: true, sheetSaved, dbSaved }, { status: 200 });
    }

    return NextResponse.json({ error: 'Failed to record callback request' }, { status: 500 });
  } catch (err) {
    console.error('Callback request insert failed', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
