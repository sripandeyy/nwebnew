import { NextRequest, NextResponse } from 'next/server'
import { readMedia } from '../../_lib/siteContentDb'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[a-f0-9]{32}$/.test(id)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const media = await readMedia(id)
    if (!media) return new NextResponse('Not found', { status: 404 })
    return new NextResponse(new Uint8Array(media.data), {
      headers: {
        'Content-Type': media.mime,
        'Content-Length': String(media.data.length),
        // Media ids are random and never reused, so the bytes can be cached forever.
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Failed to read media:', error)
    return new NextResponse('Error', { status: 500 })
  }
}
