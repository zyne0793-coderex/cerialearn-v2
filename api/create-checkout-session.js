const Stripe = require('stripe');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({error:'Stripe is not configured'});
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const plan = req.body && req.body.plan === 'teacher' ? 'teacher' : 'parent';
    const price = plan === 'teacher' ? process.env.STRIPE_TEACHER_PRICE_ID : process.env.STRIPE_PARENT_PRICE_ID;
    if (!price) return res.status(400).json({error:'Stripe Price ID is missing'});
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode:'subscription',
      line_items:[{price,quantity:1}],
      success_url:`${appUrl}/?payment=success`,
      cancel_url:`${appUrl}/?payment=cancelled`,
      allow_promotion_codes:true
    });
    res.status(200).json({url:session.url});
  } catch (e) {
    res.status(500).json({error:e.message || 'Stripe error'});
  }
};