module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const expectedId = process.env.ADMIN_ID || 'CERIA-ADMIN';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'Ceria2474!';

  const { id, password } = req.body || {};
  const ok = id === expectedId && password === expectedPassword;

  return res.status(ok ? 200 : 401).json({ ok });
};
