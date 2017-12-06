'use strict'
const cheerio = require('cheerio')

function extractUrls(xml) {
  const urls = []
  const $ = cheerio.load(xml, { xmlMode: true })

  $('loc').each(function() {
    const url = $(this).text()

    if (urls.indexOf(url) < 0) {
      urls.push(url)
    }
  })

  return urls
}

exports.extractUrls = extractUrls
