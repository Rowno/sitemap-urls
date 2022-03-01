#!/usr/bin/env node

'use strict'
const path = require('path')
const fs = require('fs')
const meow = require('meow')
const stdin = require('get-stdin')
const { main, isURL } = require('..')

const cli = meow(
  `
Usage: sitemap-urls <path> [<options>]

Path:
    Path to a file containing an XML sitemap OR URL.
    This parameter is ignored when the sitemap is being piped.

Options:
    -r, --recursive      Recursively fetch and extract urls
    -o, --output         Save output result to a file
    -d, --duplicate      Remove duplicate entry
    -h, --help           Show this help text.
    -v, --version        Print sitemap-urls' version.
`,
  {
    flags: {
      recursive: {
        type: 'boolean',
        alias: 'r'
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      duplicate: {
        type: 'boolean',
        alias: 'd'
      },
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

stdin().then(async stdinSitemap => {
  let filepath
  let sitemap
  let baseURL = ''

  // Require stdin or file
  if (!stdinSitemap && !cli.input[0]) {
    cli.showHelp()
  }

  if (cli.input[0] && isURL(cli.input[0])) {
    baseURL = cli.input[0]
  }

  // Try reading file if no stdin
  if (baseURL || stdinSitemap) {
    sitemap = stdinSitemap
  } else {
    filepath = path.resolve(cli.input[0])
    if (!fs.existsSync(filepath) || !fs.statSync(filepath).isFile()) {
      console.error("File doesn't exist:", filepath)
      process.exit(1)
    }

    sitemap = fs.readFileSync(filepath, { encoding: 'utf8' })
  }

  const urls = await main({
    isRecursive: cli.flags.r,
    filename: cli.flags.o,
    sitemapContent: sitemap,
    isDuplicate: cli.flags.d,
    baseURL
  })

  urls.forEach(url => {
    console.log(url)
  })
})
