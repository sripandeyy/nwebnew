import dbConfig from '../dbConfig'; // Import your MySQL database configuration
import mysql from 'mysql2/promise';
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { title, email, description } = body;

  // Validate title, email, and description
  if (
    !title || typeof title !== 'string' || title.trim() === '' ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !description || typeof description !== 'string' || description.trim() === ''
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
    
    const query = `INSERT INTO support_tickets (title, email, description, timestamp, date, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [title, email, description, timestamp, date, 'Pending'];
    
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
        to: email,
        subject: `New Support Ticket - ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 2px solid #ff6600; padding-bottom: 10px;">New Support Ticket</h2>
            
            <p style="font-size: 16px; color: #444; margin-bottom: 10px;"><strong>Title:</strong> ${title}</p>
            <p style="font-size: 16px; color: #444; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px; color: #444; margin-bottom: 10px;"><strong>Description:</strong></p>
            <div style="background: #fff; padding: 10px; border-left: 4px solid #ff6600; margin-bottom: 15px; color: #555;">
              ${description}
            </div>
            <p style="font-size: 16px; color: #444;"><strong>Timestamp:</strong> ${timestamp}</p>
            <p style="font-size: 16px; color: #444;"><strong>Date:</strong> ${date}</p>
            
            <footer style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777;">
              <p>This is an automated message from <strong>Nyeras Support</strong>. Please do not reply to this email.</p>
            </footer>
          </div>
        `,
      });
      

    return new Response(JSON.stringify({ message: 'Support ticket submitted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to submit ticket. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
