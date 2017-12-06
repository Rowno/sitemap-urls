'use strict'
const path = require('path')
const execa = require('execa')
// Test that the package.json bin config is correct
const CLI = path.resolve(require('../../package.json').bin['sitemap-urls'])

function formatUrls(urls) {
  return urls.join('\n') + '\n'
}

test('should extract urls from sitemap file', () => {
  const sitemapPath = path.join(__dirname, 'fixtures/sitemap.xml')

  return execa(CLI, [sitemapPath], { input: '', stripEof: false }).then(
    result => {
      expect(result.stdout).toBe(
        formatUrls(['http://example.com/', 'http://example.com/test/'])
      )
      expect(result.stderr).toBe('')
    }
  )
})

test('should extract urls from stdin', () => {
  const stdin = `
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
  `

  return execa(CLI, [], { input: stdin, stripEof: false }).then(result => {
    expect(result.stdout).toBe(
      formatUrls(['http://example.com/', 'http://example.com/test/'])
    )
    expect(result.stderr).toBe('')
  })
})
