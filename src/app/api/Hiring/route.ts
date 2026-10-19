import mysql from 'mysql2/promise';
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import dbConfig from '../dbConfig';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json();
  const {
    recruiterName, recruiterEmail, recruiterPhone, companyName, companyWebsite, jobTitle,
    jobDescription, jobType, experienceLevel, location, salary, skills, additionalInfo
  } = body;

  if (!recruiterName || !recruiterEmail || !recruiterPhone || !jobTitle || !jobDescription ||
      !jobType || !experienceLevel || !location || !skills) {
    return new Response(JSON.stringify({ message: 'Invalid data. Ensure all required fields are filled correctly.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const now = new Date();
    const timestamp = now.toISOString();
    const date = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const connection = await mysql.createConnection(dbConfig);
    
    try {
      const query = `INSERT INTO jobPostings (
        recruiterName, recruiterEmail, recruiterPhone, companyName, companyWebsite,
        jobTitle, jobDescription, jobType, experienceLevel, location, salary, skills,
        additionalInfo, timestamp, date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      await connection.execute(query, [
        recruiterName, recruiterEmail, recruiterPhone, companyName || null, companyWebsite || null,
        jobTitle, jobDescription, jobType, experienceLevel, location, salary || null, skills,
        additionalInfo || null, timestamp, date, 'Pending Review'
      ]);
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
        subject: `Job Post Submission - ${date}`,
        html: `
        <p><strong>Recruiter Name:</strong> ${recruiterName}</p>
        <p><strong>Recruiter Email:</strong> ${recruiterEmail}</p>
        <p><strong>Recruiter Phone:</strong> ${recruiterPhone}</p>
        <p><strong>Company Name:</strong> ${companyName || 'N/A'}</p>
        <p><strong>Company Website:</strong> ${companyWebsite || 'N/A'}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Job Description:</strong> ${jobDescription}</p>
        <p><strong>Job Type:</strong> ${jobType}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Salary:</strong> ${salary || 'N/A'}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Additional Info:</strong> ${additionalInfo || 'N/A'}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Date:</strong> ${date}</p>
        `,
      });
    } catch (emailError) {
      console.warn('Job posting email notification delivery failed (job saved to DB):', emailError);
    }
    
    return new Response(JSON.stringify({ message: 'Job posting submitted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to save data or send email. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
