import { NextRequest, NextResponse } from 'next/server'
import { login, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const { user, session } = await login(email, password)
    
    const res = NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, name: user.name } 
    })
    res.cookies.set(setSessionCookie(session.token))
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 })
  }
}
