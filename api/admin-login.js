module.exports = function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({ok:false});
  const ADMIN_ID=process.env.ADMIN_ID || "CERIA-ADMIN";
  const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD || "Ceria2474!";
  const body=req.body||{};
  if(body.id===ADMIN_ID && body.password===ADMIN_PASSWORD) return res.status(200).json({ok:true});
  return res.status(401).json({ok:false});
};