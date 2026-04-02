import { cookies } from 'next/headers'
import { createSession, getSessionByToken, deleteSession, getUserByEmail, createUser } from './db'
import bcrypt from 'bcryptjs'

export async function register(email: string, name: string, password: string) {
  const existing = getUserByEmail(email)
  if (existing) throw new Error('E-Mail bereits vergeben')
  
  const hash = await bcrypt.hash(password, 12)
  const userId = createUser(email, name, hash)
  const session = createSession(userId)
  return { userId, session }
}

export async function login(email: string, password: string) {
  const user = getUserByEmail(email)
  if (!user) throw new Error('E-Mail oder Passwort falsch')
  
  const valid = await bcrypt.compare(password, user.password_hash || '')
  if (!valid) throw new Error('E-Mail oder Passwort falsch')
  
  const session = createSession(user.id)
  return { user, session }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  if (!token) return null
  
  const session = getSessionByToken(token)
  return session || null
}

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  if (token) deleteSession(token)
}

export function setSessionCookie(token: string) {
  return {
    name: 'session_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  }
}
