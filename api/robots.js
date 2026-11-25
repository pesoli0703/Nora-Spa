export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  if (!host) return res.status(400).send('A deployment host is required.');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(`User-agent: *\nAllow: /\nSitemap: ${protocol}://${host}/sitemap.xml\n`);
}
