module.exports = function handler(req,res){
  res.status(200).json({paymentsConfigured:Boolean(process.env.STRIPE_SECRET_KEY)});
};