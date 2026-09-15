# CeriaLearn Polished v4 Complete

Vercel-ready CeriaLearn package.

## Root files
- `index.html`
- `404.html`
- `updates.html`
- `package.json`
- `vercel.json`
- `.env.example`
- `api/`

## API routes
- `/api/create-checkout-session`
- `/api/admin-login`
- `/api/config`

## Vercel environment variables
Set these in Vercel, not in GitHub:
- `STRIPE_SECRET_KEY`
- `ADMIN_ID`
- `ADMIN_PASSWORD`
- `APP_URL` (optional)
- `SUPABASE_URL` (optional for future connection)
- `SUPABASE_PUBLISHABLE_KEY` (optional for future connection)

Temporary admin fallback:
- ID: `CERIA-ADMIN`
- Password: `Ceria2474!`

For production, override the fallback credentials with Vercel environment variables.
