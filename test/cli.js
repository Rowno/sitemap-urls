'use strict'
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const expect = require('chai').expect
const CLI = path.resolve(require('../package.json').bin['sitemap-urls'])
const fixtureUrls = require('./fixtures/urls.json')

const SITEMAP_FILE = path.join(__dirname, 'fixtures/sitemap.xml')
const FIXTURE_OUTPUT = fixtureUrls.join('\n') + '\n'

describe('cli', () => {
  it('should extract urls from sitemap file', done => {
    const child = exec(
            CLI + ' ' + SITEMAP_FILE,
            {cwd: __dirname},
            (error, stdout, stderr) => {
              if (error) {
                return done(error)
              }

              expect(stdout, 'stdout').to.equal(FIXTURE_OUTPUT)
              expect(stderr, 'stderr').to.equal('')
              done()
            }
        )

    child.stdin.end()
  })

  it('should extract urls from stdin', done => {
    const child = exec(
            CLI,
            {cwd: __dirname},
            (error, stdout, stderr) => {
              if (error) {
                return done(error)
              }

              expect(stdout, 'stdout').to.equal(FIXTURE_OUTPUT)
              expect(stderr, 'stderr').to.equal('')
              done()
            }
        )

    fs.createReadStream(SITEMAP_FILE, {encoding: 'utf8'}).pipe(child.stdin)
  })
})
