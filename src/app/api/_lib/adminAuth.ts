import { createHash, createHmac, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'
import dbConfig from '../dbConfig'

export const ADMIN_COOKIE = 'nyeras_admin_session'
export const ADMIN_SESSION_TTL_SECONDS = 24 * 60 * 60

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'ADMIN@2026'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@nyeras2026'
// Alternate identifiers the sign-in form has always accepted for the admin account.
const ADMIN_ALIASES = ['admin@nyeras2026', 'admin@nyeras.com']

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || `nyeras-admin:${dbConfig.password}:${ADMIN_PASSWORD}`
}

function sha256(value: string) {
  return createHash('sha256').update(value).digest()
}

export function isAdminIdentifier(identifier: string): boolean {
  const id = identifier.trim()
  return id.toUpperCase() === ADMIN_USERNAME.toUpperCase() || ADMIN_ALIASES.includes(id.toLowerCase())
}

export function checkAdminCredentials(identifier: string, password: string): boolean {
  return isAdminIdentifier(identifier) && timingSafeEqual(sha256(password), sha256(ADMIN_PASSWORD))
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createAdminToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: ADMIN_USERNAME, exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS })
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return typeof exp === 'number' && exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function isAdminRequest(req: NextRequest): boolean {
  return verifyAdminToken(req.cookies.get(ADMIN_COOKIE)?.value)
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: ADMIN_SESSION_TTL_SECONDS,
}
