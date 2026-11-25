const routes = ['/', '/about', '/services', '/reviews', '/contact', '/privacy'];

export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  if (!host) return res.status(400).send('A deployment host is required to generate the sitemap.');
  const origin = `${protocol}://${host}`;
  const urls = routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
}
