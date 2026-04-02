import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getOrdersByUserId } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  
  const orders = getOrdersByUserId(session.userId)
  return NextResponse.json({ orders })
}
