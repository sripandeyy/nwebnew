import { db } from '../firebaseAdmin';
import { NextRequest} from "next/server";
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
  const { email } = body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return new Response(JSON.stringify({ message: 'Invalid email address.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  try {
    await db.collection('newsletters').add({
      email,
      timestamp: new Date().toISOString(),
    });
    return new Response(JSON.stringify({ message: 'Email saved successfully.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving email:', error);
    return new Response(JSON.stringify({ message: 'Failed to save email. Please try again later.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
