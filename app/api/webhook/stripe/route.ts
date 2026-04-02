import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateOrderPayment } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20' as any,
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } else {
      event = JSON.parse(body)
    }
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook Error: ${e.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId
      
      if (orderId) {
        updateOrderPayment(orderId, session.id, 'paid', 'processing')
        // TODO: Send confirmation email
        console.log(`✅ Payment confirmed for order ${orderId}`)
      }
      break
    }
    
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.log(`❌ Payment failed: ${intent.id}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
