import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { emails } = body;
    console.log(body);

    // Validate the emails array
    if (
      !Array.isArray(emails) ||
      emails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return new Response(
        JSON.stringify({ message: "Invalid email list. Provide a valid array of emails." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "internships@nyeras.com",
        pass: "Nyeras@69$",
      },
    });

    // Email details
    const emailContent = {
      from: 'internships@nyeras.com',
      subject: `We are hiring interns at Nyeras! visit https://www.nyeras.com/internships`,
      html: `
        <div style="margin-top: 20px;">
  <!-- Wrap the image with an anchor tag -->
  <a href="https://www.nyeras.com/internships" target="_blank" style="text-decoration: none;">
    <img src="https://i.ibb.co/0nHbZBs/White-Yellow-Simple-We-Are-Hiring-Poster-2.png" 
         alt="Enroll Now" 
         style="width: 100%; max-width: 700px; display: block; margin: 0 auto; border-radius: 10px;">
  </a>
</div>

      `,
    };


    for (const email of emails) {
      await transporter.sendMail({
        ...emailContent,
        to: email,
      });
    }

    return new Response(
      JSON.stringify({ message: "Emails sent successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ message: "Error sending emails." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}