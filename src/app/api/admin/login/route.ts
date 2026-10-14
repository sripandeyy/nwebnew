import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, adminCookieOptions, checkAdminCredentials, createAdminToken } from '../../_lib/adminAuth'

const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000
const failures = new Map<string, { count: number; resetAt: number }>()

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local'
  const entry = failures.get(ip)
  if (entry && entry.resetAt > Date.now() && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many attempts. Please try again in 15 minutes.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const identifier = String(body?.identifier ?? '')
  const password = String(body?.password ?? '')

  if (!checkAdminCredentials(identifier, password)) {
    const now = Date.now()
    if (!entry || entry.resetAt <= now) failures.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    else entry.count += 1
    return NextResponse.json({ error: 'Incorrect admin username or password.' }, { status: 401 })
  }

  failures.delete(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, createAdminToken(), adminCookieOptions)
  return res
}
