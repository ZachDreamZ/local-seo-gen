import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    // 1. Test Supabase Connection
    const { data: profiles, error: sbError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (sbError) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Supabase connection failed', 
        details: sbError.message 
      }, { status: 500 })
    }

    // 2. Test Stripe Key Presence
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    return NextResponse.json({
      status: 'ok',
      checks: {
        supabase: 'Connected',
        stripeKey: stripeKey ? 'Configured' : 'Missing',
        stripeWebhook: webhookSecret ? 'Configured' : 'Missing',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'Missing',
      }
    })
  } catch (e: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Unexpected error during health check', 
      details: e.message 
    }, { status: 500 })
  }
}
