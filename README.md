# CeriaLearn KPM Fun v3

Upload the CONTENTS of this ZIP to the root of your working GitHub repo.

## Admin access (temporary)
Admin ID: CERIA-ADMIN
Admin Password: Ceria2474!

For production, set ADMIN_ID and ADMIN_PASSWORD in Vercel Environment Variables so the fallback credentials are not used.

## Stripe
This version creates MYR monthly Checkout subscriptions directly:
- Parent RM9.90/month
- Teacher RM29/month

Only STRIPE_SECRET_KEY is required in Vercel.
Recommended:
- APP_URL = your production Vercel URL

This build is designed for Stripe test mode first. Move to live mode only after testing.

## KPM curriculum basis
The topic structure is organized around lower-primary Mathematics domains under KSSR (Semakan 2017), with KPM's Tahap I curriculum alignment updates (Edisi 3). Questions in this MVP are original practice questions, not copied from KPM documents.

## Included
- Tahun 1, 2, 3
- Quiz by topic
- Cute correct/wrong animations
- Gentle sound feedback
- XP, stars, streak, level
- Admin full-access panel
- Parent/Teacher Stripe Checkout
- Mobile-friendly UI
