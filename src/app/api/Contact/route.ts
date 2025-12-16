import dbConfig from '../dbConfig'; // Import your MySQL database configuration
import mysql from 'mysql2/promise';
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { name, email, phone, message } = body;

  // Validate name, email, phone, and message
  if (
    !name || typeof name !== 'string' || name.trim() === '' ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone || typeof phone !== 'string' || !/^\d{10}$/.test(phone) ||
    !message || typeof message !== 'string' || message.trim() === ''
  ) {
    return new Response(
      JSON.stringify({ message: 'Invalid data. Ensure all fields are filled correctly.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const now = new Date();
    const timestamp = now.toISOString();
    const date = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    
    const query = `INSERT INTO leads (name, email, phone, timestamp, date, action, myaction, notes, message,course) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, phone, timestamp, date, 'Filled Contact Form', 'Not Reviewed', '', message,'NA'];
    
    await connection.execute(query, values);
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
      subject: `Nyeras - Consultation Request ${date}`,
      html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone} 
        <a href="tel:${phone}" 
           style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #FFA500; color: white; text-decoration: none; border-radius: 5px;">
          Call
        </a>
      </p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>Date:</strong> ${date}</p>
      `,
    });

    return new Response(JSON.stringify({ message: 'Data saved and email sent successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to save data or send email. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
