'use strict';
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var expect = require('chai').expect;
var fixtureUrls = require('./fixtures/urls.json');

var CLI = path.resolve(require('../package.json').bin['sitemap-urls']);
var SITEMAP_FILE = path.join(__dirname, 'fixtures/sitemap.xml');
var FIXTURE_OUTPUT = fixtureUrls.join('\n') + '\n';


describe('cli', function () {
    it('should extract urls from sitemap file', function (done) {

        var child = exec(
            CLI + ' ' + SITEMAP_FILE,
            { cwd: __dirname },
            function (error, stdout, stderr) {
                if (error) {
                    return done(error);
                }

                expect(stdout, 'stdout').to.equal(FIXTURE_OUTPUT);
                expect(stderr, 'stderr').to.equal('');
                done();
            }
        );

        child.stdin.end();
    });

    it('should extract urls from stdin', function (done) {
        var child = exec(
            CLI,
            { cwd: __dirname },
            function (error, stdout, stderr) {
                if (error) {
                    return done(error);
                }

                expect(stdout, 'stdout').to.equal(FIXTURE_OUTPUT);
                expect(stderr, 'stderr').to.equal('');
                done();
            }
        );

        fs.createReadStream(SITEMAP_FILE, { encoding: 'utf8' }).pipe(child.stdin);
    });
});
