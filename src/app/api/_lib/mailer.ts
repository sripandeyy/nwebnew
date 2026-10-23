import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

/**
 * Returns a configured singleton Nodemailer transporter.
 * Configured specifically for Hostinger Business SMTP (smtp.hostinger.com:465 SSL).
 * Short 5-second timeouts ensure requests are never blocked on network stalls.
 */
export function getMailer(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';

    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 5000, // 5 seconds
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });
  }
  return transporter;
}

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Safely send an email without throwing uncaught exceptions.
 * Failures are non-fatal, logged to stderr/console, and return { success: false, error }.
 */
export async function sendMailSafe(
  mailOptions: nodemailer.SendMailOptions
): Promise<SendMailResult> {
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  if (!user || !pass) {
    console.warn('[Mailer] SMTP credentials missing (SMTP_USER / SMTP_PASS). Skipping email dispatch.');
    return { success: false, error: 'SMTP credentials not configured' };
  }

  try {
    const mailer = getMailer();
    const fromAddress = mailOptions.from || process.env.SMTP_FROM || user;
    const info = await mailer.sendMail({
      ...mailOptions,
      from: fromAddress,
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[Mailer] Non-fatal email delivery failure to "${mailOptions.to}": ${msg}`);
    return { success: false, error: msg };
  }
}
