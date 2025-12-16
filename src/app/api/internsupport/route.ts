import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const { name, email, message } = body;

    // Validate input fields
    if (
      !name || typeof name !== 'string' || name.trim() === '' ||
      !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || typeof message !== 'string' || message.trim() === ''
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

    // Configure Nodemailer for email notifications
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', // Replace with your SMTP host
      port: 465,                 // Use the secure SMTP port
      secure: true,              // Use SSL/TLS
      auth: {
        user: 'no-reply@nyeras.com', // Your custom domain email
        pass: 'Techteam@123$',        // Your email password
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: 'no-reply@nyeras.com',
      to: 'internships@nyeras.com',
      subject: `Nyeras - Support Request ${date}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Date:</strong> ${date}</p>
      `,
    });

    // Respond with success
    return new Response(
      JSON.stringify({ message: 'Email sent successfully.' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email. Please try again later.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
