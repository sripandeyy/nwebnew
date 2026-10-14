import { randomBytes } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '../../_lib/adminAuth'
import { ALLOWED_MEDIA_TYPES, MAX_MEDIA_BYTES, insertMedia } from '../../_lib/siteContentDb'

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const match = typeof body?.dataUrl === 'string' ? body.dataUrl.match(/^data:([a-z/+-]+);base64,(.+)$/i) : null
  if (!match) {
    return NextResponse.json({ error: 'Expected an image file.' }, { status: 400 })
  }

  const mime = match[1].toLowerCase()
  if (!ALLOWED_MEDIA_TYPES.includes(mime)) {
    return NextResponse.json({ error: 'Only JPG, PNG, WebP or GIF images are allowed.' }, { status: 400 })
  }

  const data = Buffer.from(match[2], 'base64')
  if (data.length === 0 || data.length > MAX_MEDIA_BYTES) {
    return NextResponse.json({ error: 'Image must be smaller than 3 MB.' }, { status: 413 })
  }

  try {
    const id = randomBytes(16).toString('hex')
    await insertMedia(id, mime, data)
    return NextResponse.json({ url: `/api/media/${id}` })
  } catch (error) {
    console.error('Failed to store uploaded image:', error)
    return NextResponse.json({ error: 'Could not save the image. Please try again.' }, { status: 500 })
  }
}
