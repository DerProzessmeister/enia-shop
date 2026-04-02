import { NextRequest, NextResponse } from 'next/server'
import { createTicket } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const id = createTicket(data)
    return NextResponse.json({ success: true, ticketId: `TK-${id.slice(-6).toUpperCase()}` })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
