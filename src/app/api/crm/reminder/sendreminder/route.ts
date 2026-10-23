import { NextRequest } from 'next/server';
import { sendMailSafe } from '../../../../api/_lib/mailer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, dueDate, amount } = body;

        if (!name || !email || !dueDate || !amount) {
            return new Response(JSON.stringify({ message: 'All fields are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const utcDate = new Date(dueDate);
        const istDate = new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(utcDate);

        // Format amount with currency symbol if it's just a number
        const formattedAmount = amount.toString().includes('₹') ? amount : `₹${amount}`;

        // Professional HTML email template
        const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Reminder</title>
                <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4a6fdc;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
        }
        .payment-details {
            background-color: #f9f9f9;
            border-left: 4px solid #4a6fdc;
            padding: 15px;
            margin: 20px 0;
        }
        .payment-details p {
            margin: 5px 0;
        }
        .cta-button {
            display: inline-block;
            background-color: #4a6fdc;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .button-container {
            text-align: center;
            margin: 25px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666666;
            background-color: #f5f5f5;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Reminder</h1>
                </div>
                <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>We hope this email finds you well. This is a friendly reminder about an upcoming payment due on your account.</p>
            
            <div class="payment-details">
                <p><strong>Amount Due:</strong> ${formattedAmount}</p>
                <p><strong>Due Date:</strong> ${istDate}</p>
            </div>
            
            <p>Please ensure timely payment to avoid any late fees or service interruptions. If you have already made this payment, please disregard this reminder.</p>
            
            <div class="button-container">
                <a href="https://razorpay.me/@thenyeragroups" class="cta-button" target="_blank">Pay Now</a>
            </div>
            
            <p>If you have any questions regarding this payment or need assistance, please don't hesitate to contact our support team at administration@nyeras.com</p>

            <p>Thank you for your prompt attention to this matter.</p>
            
            <p>Best regards,<br>Nyeras Team</p>
        </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Nyeras. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        await sendMailSafe({
            to: email,
            subject: `Reminder: Payment Due on ${istDate}`,
            html: emailHtml,
        });

        return new Response(JSON.stringify({ message: 'Reminder created and email sent successfully.' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to create reminder or send email. Please try again later.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
