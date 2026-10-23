import { getDb } from '../../db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get token from URL query parameters
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  

  const validToken = 'AEC83RFIJBCB239RG29UWGR9BEIC239CONU23U22FB23933VFYFV9Y29F2FUFV9V9FV2U9FV2UVFU9F2VF92UF2FILERBIVFLEIRFVEIFV3ELFVE3FUERFU9F3EF';
  
  if (!token || token !== validToken) {
    return NextResponse.json(
      { message: 'Unauthorized: Invalid or missing token' },
      { status: 401 }
    );
  }

  
  try {
    const connection = getDb();

    const [rows] = await connection.execute(
      'SELECT id, payload, createdAt FROM razorpay_webhooks ORDER BY createdAt DESC'
    );

    // connection returned to pool

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching webhook payments:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve payments.' },
      { status: 500 }
    );
  }
}
