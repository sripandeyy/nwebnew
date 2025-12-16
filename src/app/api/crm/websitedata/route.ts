import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../firebaseAdmin';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== 'GET') {
      return new NextResponse(
        JSON.stringify({ message: 'Method not allowed' }),
        {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const dataRef = db.collection('websitedata'); // Fetch from 'websitedata'
    const snapshot = await dataRef.get();

    const emailMap = new Map<string, any>(); // To store unique emails

    snapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email || null;

      if (email && !emailMap.has(email)) {
        emailMap.set(email, {
          id: doc.id,
          action: data.action || null,
          course: data.course || null,
          date: data.date || null,
          email,
          message: data.message || null,
          myaction: data.myaction || null,
          name: data.name || null,
          phone: data.phone || null,
          timestamp: data.timestamp || null,
        });
      }
    });

    return new NextResponse(JSON.stringify(Array.from(emailMap.values())), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching website data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
