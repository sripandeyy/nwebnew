import dbConfig from '../dbConfig';
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';
import { appendCallbackToGoogleSheet } from '../_lib/googleSheet';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const body = await req.json();
  const { name, email, phone, program } = body;
  const notes = (body.notes || body.note || '').toString().trim();
  const source = (body.source || 'Website Request Callback').toString().trim();

  // Validate name, email, and phone
  if (
    !name || typeof name !== 'string' || name.trim() === '' ||
    !email || typeof email !== 'string' || !email.includes('@') ||
    !phone || typeof phone !== 'string' || phone.trim() === ''
  ) {
    return new Response(
      JSON.stringify({ message: 'Invalid data. Ensure all fields are filled correctly.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Get current date and time
  const now = new Date();
  const timestamp = now.toISOString();
  const date = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  let sheetSaved = false;
  let dbSaved = false;

  // 1. Sync to Google Spreadsheet (Guaranteed call to Google Sheets Webhook / API)
  try {
    const sheetRes = await appendCallbackToGoogleSheet({
      name,
      email,
      phone,
      program,
      notes,
      timestamp,
      date,
      source,
    });
    sheetSaved = Boolean(sheetRes?.success);
  } catch (sheetError) {
    console.warn('[SubmitForm] Google Sheet append error:', sheetError);
  }

  // 2. Store the data in the MySQL database (isolated so DB network delay/outage never loses the Google Sheet lead)
  try {
    const connection = await mysql.createConnection(dbConfig);
    try {
      await connection.execute(
        'INSERT INTO leads (name, email, phone, course, timestamp, date, action, message, myaction, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, program, timestamp, date, 'Call Request', 'NA', 'Not Reviewed', notes]
      );
      dbSaved = true;
    } finally {
      await connection.end().catch(() => {});
    }
  } catch (dbError) {
    console.warn('[SubmitForm] MySQL leads table insert failed (non-fatal if sheet saved):', dbError);
  }

  // 3. Send an email notification using NodeMailer (non-fatal if SMTP fails or is unconfigured)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "no-reply@nyeras.com",
        pass: process.env.SMTP_PASS || "Techteam@123$",
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'no-reply@nyeras.com',
      to: process.env.NOTIFICATION_EMAIL || 'thenyera@gmail.com',
      subject: `Nyeras - Call Request ${date}`,
      html: `
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Program:</strong> ${program}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      <p><strong>Phone:</strong> ${phone} 
        <a href="tel:${phone}" 
           style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #FFA500; color: white; text-decoration: none; border-radius: 5px;">
          Call
        </a>
      </p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>Date:</strong> ${date}</p>
    `,
    });
  } catch (emailError) {
    console.warn('[SubmitForm] Callback notification email delivery failed:', emailError);
  }

  // If either Google Sheet or Database succeeded, return success
  if (sheetSaved || dbSaved) {
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Callback request received and saved successfully.',
      sheetSaved,
      dbSaved
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    JSON.stringify({ message: 'Failed to save data. Please check connection and try again.' }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
