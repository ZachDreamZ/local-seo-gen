# Production Environment Variables Checklist

## Supabase (Verified)
- [x] `NEXT_PUBLIC_SUPABASE_URL`: https://hqejobdeqoehmkfspcdm.supabase.co
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sb_publishable_G31SP6V1Ds3NY6qN4VWCNw_c0Qi5cN9
- [x] `SUPABASE_SERVICE_ROLE_KEY`: (Stored in .env.local)

## Stripe (Required)
- [ ] `STRIPE_SECRET_KEY`: Your production secret key from Stripe Dashboard.
- [ ] `STRIPE_WEBHOOK_SECRET`: The signing secret for your Vercel webhook endpoint.

## General (TBD)
- [ ] `NEXT_PUBLIC_SITE_URL`: The final production URL (e.g., https://local-seo-gen.vercel.app).
