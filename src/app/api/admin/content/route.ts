import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '../../_lib/adminAuth'
import { isSiteContentKey, writeContent } from '../../_lib/siteContentDb'

const MAX_CONTENT_CHARS = 4 * 1024 * 1024

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
  }

  const raw = await req.text()
  if (raw.length > MAX_CONTENT_CHARS) {
    return NextResponse.json({ error: 'Content is too large to save.' }, { status: 413 })
  }

  let body: { key?: unknown; data?: unknown }
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!isSiteContentKey(body.key)) {
    return NextResponse.json({ error: 'Unknown content type.' }, { status: 400 })
  }
  if (!body.data || typeof body.data !== 'object' || Array.isArray(body.data)) {
    return NextResponse.json({ error: 'Content must be an object.' }, { status: 400 })
  }

  try {
    await writeContent(body.key, body.data)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to save site content:', error)
    return NextResponse.json({ error: 'Could not save to the database. Please try again.' }, { status: 500 })
  }
}
