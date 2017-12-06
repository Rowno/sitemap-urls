/* eslint-disable no-sync */
'use strict'
const sitemapUrls = require('../')

describe('#extractUrls', () => {
  test('should extract urls', () => {
    const urls = sitemapUrls.extractUrls(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
          <loc>http://example.com/</loc>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>http://example.com/test/</loc>
          <priority>1.0</priority>
        </url>
      </urlset>
    `)

    expect(urls).toEqual(['http://example.com/', 'http://example.com/test/'])
  })

  test('should not include duplicate urls', () => {
    const urls = sitemapUrls.extractUrls(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
          <loc>http://example.com/</loc>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>http://example.com/</loc>
          <priority>1.0</priority>
        </url>
      </urlset>
    `)

    expect(urls).toEqual(['http://example.com/'])
  })
})
