const Stripe = require('stripe');

module.exports = async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!process.env.STRIPE_SECRET_KEY) return res.status(503).json({error:'Stripe belum disambungkan pada Vercel.'});
  try{
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const plan=req.body && req.body.plan==='teacher' ? 'teacher' : 'parent';
    const unit_amount=plan==='teacher' ? 2900 : 990;
    const name=plan==='teacher' ? 'CeriaLearn Teacher' : 'CeriaLearn Parent';
    const appUrl=process.env.APP_URL || `https://${req.headers.host}`;
    const session=await stripe.checkout.sessions.create({
      mode:'subscription',
      line_items:[{
        price_data:{
          currency:'myr',
          unit_amount,
          recurring:{interval:'month'},
          product_data:{name}
        },
        quantity:1
      }],
      success_url:`${appUrl}/?payment=success`,
      cancel_url:`${appUrl}/?payment=cancelled`,
      allow_promotion_codes:true
    });
    res.status(200).json({url:session.url});
  }catch(e){res.status(500).json({error:e.message||'Stripe error'});}
};