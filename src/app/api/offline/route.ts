import dbConfig from '../dbConfig';
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

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
  const { name, email, phone } = body;

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

  try {
    const now = new Date();
    const timestamp = now.toISOString();
    const date = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const connection = await mysql.createConnection(dbConfig);
    try {
      await connection.execute(
        'INSERT INTO leads (name, email, phone, course, timestamp, date, action, message, myaction, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, 'Offline', timestamp, date, 'Offline Enquiry', 'NA', 'Not Reviewed', '']
      );
    } finally {
      await connection.end().catch(() => {});
    }

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
        subject: `Nyeras - Java Offline Classes ${date}`,
        html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone} 
          <a href="tel:${phone}" 
             style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #FFA500; color: white; text-decoration: none; border-radius: 5px;">
            Call
          </a>
        </p>
        <p><strong>Program:</strong> OFFLINE - JAVA FULL STACK</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Date:</strong> ${date}</p>
      `,
      });
    } catch (emailError) {
      console.warn('Offline Java email notification delivery failed (lead saved to DB):', emailError);
    }
  
    return new Response(JSON.stringify({ message: 'Data saved successfully.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to save data or send email. Please try again later.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
