/*jshint expr:true */
'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var sitemapUrls = require('../');


describe('index', function () {
    describe('#extractUrls', function () {
        it('should extract urls', function () {
            var fixtureXml = fs.readFileSync(__dirname + '/fixtures/sitemap.xml', 'utf8');
            var fixtureUrls = require('./fixtures/urls.json');
            var urls = sitemapUrls.extractUrls(fixtureXml);

            expect(urls).to.have.members(fixtureUrls);
        });
    });
});
