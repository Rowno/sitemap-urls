/*jshint expr:true */
'use strict';

var expect = require('chai').expect;
var fs = require('fs');
var index = require('../lib/index');


describe('index', function () {
    it('.version should match package.json version', function () {
        var packageJson = fs.readFileSync(__dirname + '/../package.json', 'utf8');

        packageJson = JSON.parse(packageJson);
        expect(index.version).to.equal(packageJson.version);
    });
});
