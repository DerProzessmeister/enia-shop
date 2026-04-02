import { NextResponse } from 'next/server'
import { logout } from '@/lib/auth'

export async function POST() {
  await logout()
  const res = NextResponse.json({ success: true })
  res.cookies.delete('session_token')
  return res
}
