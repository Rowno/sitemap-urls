#!/usr/bin/env node

/* eslint-disable no-sync, no-process-exit */
'use strict'
const path = require('path')
const fs = require('fs')
const meow = require('meow')
const stdin = require('get-stdin')
const updateNotifier = require('update-notifier')
const sitemapUrls = require('../')
const pkg = require('../package.json')

const HELP_FILE_PATH = path.join(__dirname, 'help.txt')

updateNotifier({pkg}).notify()

const cli = meow({
  pkg,
  help: fs.readFileSync(HELP_FILE_PATH, {encoding: 'utf8'}).trim()
}, {
  alias: {
    help: 'h',
    version: 'v'
  }
})

stdin().then(stdinSitemap => {
  let filepath
  let sitemap

    // Require stdin or file
  if (!stdinSitemap && !cli.input[0]) {
    cli.showHelp()
    process.exit(1)
  }

    // Try reading file if no stdin
  if (stdinSitemap) {
    sitemap = stdinSitemap
  } else {
    filepath = path.resolve(cli.input[0])
    if (!fs.existsSync(filepath) || !fs.statSync(filepath).isFile()) {
      console.error('File doesn\'t exist:', filepath)
      process.exit(1)
    }

    sitemap = fs.readFileSync(filepath, {encoding: 'utf8'})
  }

  const urls = sitemapUrls.extractUrls(sitemap)

  urls.forEach(url => {
    console.log(url)
  })
})
