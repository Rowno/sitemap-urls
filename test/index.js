/* eslint-disable no-sync */
'use strict'
const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const sitemapUrls = require('../')
const fixtureUrls = require('./fixtures/urls.json')

const fixtureXml = fs.readFileSync(path.join(__dirname, 'fixtures/sitemap.xml'), 'utf8')

describe('index', () => {
  describe('#extractUrls', () => {
    it('should extract urls', () => {
      const urls = sitemapUrls.extractUrls(fixtureXml)

      expect(urls).to.have.members(fixtureUrls)
    })
  })
})
