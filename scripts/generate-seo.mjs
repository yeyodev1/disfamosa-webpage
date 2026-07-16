import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const publicDir = path.join(projectRoot, 'public')

async function localSiteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL

  try {
    const env = await fs.readFile(path.join(projectRoot, '.env'), 'utf8')
    const match = env.match(/^VITE_SITE_URL=(.+)$/m)
    if (match?.[1]) return match[1].trim()
  } catch {}

  return 'https://disfamosa.example'
}

const routes = [
  '/',
  '/nosotros',
  '/proyectos',
  '/proyectos/cocinas',
  '/proyectos/banos',
  '/proyectos/closets',
  '/proyectos/especiales',
  '/proyectos/lavanderias',
  '/contacto',
]

const siteUrl = (await localSiteUrl()).replace(/\/+$/, '')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>${route.startsWith('/proyectos') ? 'monthly' : 'yearly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route === '/contacto' ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`

await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(publicDir, 'robots.txt'), robots)
console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`)
