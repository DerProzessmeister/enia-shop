import { NextRequest, NextResponse } from 'next/server'
import { getReviewsByProductId, createReview } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const productId = parseInt(req.nextUrl.searchParams.get('productId') || '0')
  if (!productId) return NextResponse.json({ reviews: [] })
  const reviews = getReviewsByProductId(productId)
  return NextResponse.json({ reviews })
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    const { productId, rating, title, body } = await req.json()
    createReview({ userId: session?.userId, productId, rating, title, body })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
