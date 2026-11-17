import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(rootDir, 'dist')
const indexPath = join(distDir, 'index.html')
const robotsPath = join(distDir, 'robots.txt')
const sitemapPath = join(distDir, 'sitemap.xml')

const configuredUrl = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = configuredUrl
  ? new URL(configuredUrl.startsWith('http') ? configuredUrl : `https://${configuredUrl}`).origin
  : null

if (!siteUrl) {
  await writeFile(robotsPath, 'User-agent: *\nAllow: /\n', 'utf8')
  console.info('SEO: configure VITE_SITE_URL to generate canonical URL and sitemap outside Vercel.')
} else {
  const html = await readFile(indexPath, 'utf8')
  const absoluteHome = `${siteUrl}/`
  const domainTags = [
    `    <link rel="canonical" href="${absoluteHome}" />`,
    `    <meta property="og:url" content="${absoluteHome}" />`,
  ].join('\n')

  const updatedHtml = html.includes('rel="canonical"')
    ? html
    : html.replace('</head>', `${domainTags}\n  </head>`)

  await writeFile(indexPath, updatedHtml, 'utf8')
  await writeFile(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${absoluteHome}</loc></url>\n</urlset>\n`, 'utf8')
  await writeFile(robotsPath, `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8')
  console.info(`SEO: canonical URL, sitemap and robots configured for ${siteUrl}`)
}
