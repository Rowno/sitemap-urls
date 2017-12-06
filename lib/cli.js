#!/usr/bin/env node

/* eslint-disable no-sync, no-process-exit */
'use strict'
const path = require('path')
const fs = require('fs')
const meow = require('meow')
const stdin = require('get-stdin')
const sitemapUrls = require('../')

const cli = meow(
  `
Usage: sitemap-urls <path> [<options>]

Path:
    Path to a file containing an XML sitemap.
    This parameter is ignored when the sitemap is being piped.

Options:
    -h, --help      Show this help text.
    -v, --version   Print sitemap-urls' version.
`,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
)

stdin().then(stdinSitemap => {
  let filepath
  let sitemap

  // Require stdin or file
  if (!stdinSitemap && !cli.input[0]) {
    cli.showHelp()
  }

  // Try reading file if no stdin
  if (stdinSitemap) {
    sitemap = stdinSitemap
  } else {
    filepath = path.resolve(cli.input[0])
    if (!fs.existsSync(filepath) || !fs.statSync(filepath).isFile()) {
      console.error("File doesn't exist:", filepath)
      process.exit(1)
    }

    sitemap = fs.readFileSync(filepath, { encoding: 'utf8' })
  }

  const urls = sitemapUrls.extractUrls(sitemap)

  urls.forEach(url => {
    console.log(url)
  })
})
