import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/db'
import { getSession } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20' as any,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, shipping, paymentMethod } = body
    
    const session = await getSession()
    
    // Calculate totals
    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const shippingCost = subtotal >= 499 ? 0 : 9.95
    const tax = subtotal * 0.19 / 1.19 // MwSt aus Bruttobetrag
    const total = subtotal + shippingCost

    // Create order in DB
    const { id: orderId, orderNumber } = createOrder({
      userId: session?.userId,
      guestEmail: !session ? customer.email : undefined,
      items: items.map((i: any) => ({
        productId: i.id,
        productName: i.name,
        productSku: i.sku || '',
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      paymentMethod,
      shippingName: customer.name,
      shippingStreet: customer.street,
      shippingCity: customer.city,
      shippingZip: customer.zip,
    })

    // If Stripe payment
    if (paymentMethod === 'card' || paymentMethod === 'klarna') {
      if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
        const stripeSession = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: paymentMethod === 'klarna' ? ['klarna'] : ['card'],
          line_items: items.map((item: any) => ({
            price_data: {
              currency: 'eur',
              product_data: { name: item.name, images: item.image ? [item.image] : [] },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          customer_email: customer.email,
          metadata: { orderId },
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bestellung/erfolg?order=${orderId}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
          shipping_options: [{
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: Math.round(shippingCost * 100), currency: 'eur' },
              display_name: shippingCost === 0 ? 'Gratisversand' : 'Standardversand',
            }
          }],
        })
        return NextResponse.json({ 
          success: true, orderId, orderNumber,
          stripeUrl: stripeSession.url 
        })
      }
    }

    // PayPal or manual payment
    return NextResponse.json({ success: true, orderId, orderNumber })

  } catch (e: any) {
    console.error('Checkout error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
