import { stripe } from '@/utils/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any
      const userId = session.metadata.userId

      // Update user subscription status in DB (we'll add a subscriptions table)
      await supabaseAdmin
        .from('profiles')
        .update({ is_subscribed: true })
        .eq('id', userId)
      break;
    
    case 'customer.subscription.deleted':
      const subscription = event.data.object as any
      // Find user by stripe customer id and mark unsubscribed
      // (Requires storing stripe_customer_id in profiles)
      break;
  }

  return NextResponse.json({ received: true })
}
