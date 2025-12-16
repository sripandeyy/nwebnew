import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/__nextjs_original-stack-frame')) {
    return new NextResponse(null, { status: 204 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/__nextjs_original-stack-frame'],
}


