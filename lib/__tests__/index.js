/* eslint-disable no-sync */
'use strict'
const fs = require('fs')
const path = require('path')
const sitemapUrls = require('../')
const fixtureUrls = require('./fixtures/urls.json')

const fixtureXml = fs.readFileSync(path.join(__dirname, 'fixtures/sitemap.xml'), 'utf8')

describe('#extractUrls', () => {
  test('should extract urls', () => {
    const urls = sitemapUrls.extractUrls(fixtureXml)

    expect(urls).toEqual(fixtureUrls)
  })
})
