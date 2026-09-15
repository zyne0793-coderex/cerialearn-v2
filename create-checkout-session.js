const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Kaedah tidak dibenarkan.' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(503).json({ error: 'Stripe belum disambungkan pada Vercel.' });
  }

  const plans = {
    parent: {
      name: 'CeriaLearn Parent',
      amount: 990
    },
    teacher: {
      name: 'CeriaLearn Teacher',
      amount: 2900
    }
  };

  const plan = plans[req.body && req.body.plan];
  if (!plan) {
    return res.status(400).json({ error: 'Pelan tidak sah.' });
  }

  try {
    const stripe = new Stripe(secret);
    const origin = (process.env.APP_URL || `https://${req.headers.host}`).replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'myr',
          unit_amount: plan.amount,
          recurring: { interval: 'month' },
          product_data: { name: plan.name }
        }
      }],
      allow_promotion_codes: true,
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled`
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return res.status(500).json({ error: 'Stripe Checkout belum dapat dibuka.' });
  }
};
