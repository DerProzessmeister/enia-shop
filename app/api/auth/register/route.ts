import { NextRequest, NextResponse } from 'next/server'
import { register, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json()
    
    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Alle Felder erforderlich' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Passwort mind. 8 Zeichen' }, { status: 400 })
    }
    
    const { userId, session } = await register(email, name, password)
    
    const res = NextResponse.json({ success: true, userId })
    res.cookies.set(setSessionCookie(session.token))
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
