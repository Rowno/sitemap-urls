/* eslint-disable no-sync */
'use strict';
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var sitemapUrls = require('../');
var fixtureUrls = require('./fixtures/urls.json');

var fixtureXml = fs.readFileSync(path.join(__dirname, 'fixtures/sitemap.xml'), 'utf8');


describe('index', function () {
    describe('#extractUrls', function () {
        it('should extract urls', function () {
            var urls = sitemapUrls.extractUrls(fixtureXml);

            expect(urls).to.have.members(fixtureUrls);
        });
    });
});
