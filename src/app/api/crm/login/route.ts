import { NextResponse } from 'next/server'
import { getDb } from '../../db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body?.email || '').toString().trim()
    const password = (body?.password || '').toString()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const db = getDb()
    const [rows] = await db.execute(
      'SELECT id, crm_uid, name, email, password, role, status FROM crm_login WHERE LOWER(email) = LOWER(?) LIMIT 1',
      [email]
    )
    const user = Array.isArray(rows) ? (rows as any[])[0] : undefined
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (String(user.password) !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await db.execute('UPDATE crm_login SET last_login_at = NOW() WHERE id = ?', [user.id])

    return NextResponse.json({
      id: user.id,
      crm_uid: user.crm_uid,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


