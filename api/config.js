module.exports = function handler(req, res) {
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY || "",
    paymentsConfigured: Boolean(process.env.STRIPE_SECRET_KEY)
  });
};