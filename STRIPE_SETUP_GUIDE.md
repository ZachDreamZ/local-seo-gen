# Stripe Production Setup Guide

To move from test mode to production, follow these steps:

## 1. Update API Keys
In your Vercel Project Settings -> Environment Variables, update the following:
- `STRIPE_SECRET_KEY`: Change from `sk_test_...` to `sk_live_...` (Found in Stripe Dashboard -> Developers -> API Keys).
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Change from `pk_test_...` to `pk_live_...`.

## 2. Configure Webhook
1. Go to Stripe Dashboard -> Developers -> Webhooks.
2. Click **Add endpoint**.
3. **Endpoint URL**: `https://your-domain.vercel.app/api/stripe/webhook`
4. **Select events**: `checkout.session.completed`, `customer.subscription.deleted`.
5. Copy the **Signing secret** (`whsec_...`) and add it to Vercel as `STRIPE_WEBHOOK_SECRET`.

## 3. Set Production Site URL
Update `NEXT_PUBLIC_SITE_URL` in Vercel to your actual production domain (e.g., `https://local-seo-gen.vercel.app`). This ensures Stripe redirects users back to your site after payment.
