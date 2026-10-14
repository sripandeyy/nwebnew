import { NextResponse } from 'next/server'
import { readAllContent } from '../_lib/siteContentDb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const content = await readAllContent()
    return NextResponse.json(content, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('Failed to load site content:', error)
    return NextResponse.json({ error: 'Content unavailable' }, { status: 503 })
  }
}
