import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '../../_lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  return NextResponse.json({ admin: isAdminRequest(req) }, { status: isAdminRequest(req) ? 200 : 401 })
}
