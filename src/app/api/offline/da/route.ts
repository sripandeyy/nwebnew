import dbConfig from '../../dbConfig';
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
    await connection.execute(
      'INSERT INTO leads (name, email, phone, course, timestamp, date, action, message, myaction, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, 'Offline', timestamp, date, 'Offline Enquiry - Data Analytics', 'NA', 'Not Reviewed', '']
    );
    await connection.end();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@nyeras.com",
        pass: "Techteam@123$",
      },
    });

    await transporter.sendMail({
      from: 'no-reply@nyeras.com',
      to: 'thenyera@gmail.com',
      subject: `Nyeras - Data Analytics Offline Classes ${date}`,
      html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone} 
        <a href="tel:${phone}" 
           style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #FFA500; color: white; text-decoration: none; border-radius: 5px;">
          Call
        </a>
      </p>
      <p><strong>Program:</strong> OFFLINE - Data Analytics </p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>Date:</strong> ${date}</p>
    `,
    });
  
    return new Response(JSON.stringify({ message: 'Data saved and email sent successfully.' }), {
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
