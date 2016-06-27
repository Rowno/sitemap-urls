/* eslint-disable no-sync */
'use strict';
var fs = require('fs');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = require('chai').expect;
var sitemapUrls = require('../');
var fixtureUrls = require('./fixtures/urls.json');

var fixtureXml = fs.readFileSync(path.join(__dirname, 'fixtures/sitemap.xml'), 'utf8');

chai.use(chaiAsPromised);


describe('index', function () {
    describe('#extractUrls', function () {
        it('should extract urls', function () {
            return expect(sitemapUrls.extractUrls(fixtureXml)).to.eventually.have.members(fixtureUrls);
        });
    });
});
