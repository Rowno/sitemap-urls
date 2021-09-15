'use strict'
const cheerio = require('cheerio')
const path = require('path')
const axios = require('axios')
const fs = require('fs')

async function fetchXML(url) {
  const res = await axios(url)
  return res.data
}

function isURLXML(url) {
  const ext = path.extname(url)
  return ext.toLocaleLowerCase() === '.xml'
}

function extractUrls(xml) {
  const urls = []
  const $ = cheerio.load(xml, { xmlMode: true })

  $('loc').each(function() {
    const url = $(this).text()

    if (!urls.includes(url)) {
      urls.push(url)
    }
  })

  return urls
}

function saveOutput(urlsArray, filename) {
  const file = fs.createWriteStream(filename)
  file.on('error', function(err) {
    console.log(`Error: ${err}`)
  })
  urlsArray.forEach(function(v) {
    file.write(v + '\n')
  })
  file.end()
}

function isURL(str) {
  try {
    const myURL = new URL(str)
    if (myURL.href) return true
  } catch {
    return false
  }
}

async function main({
  baseURL,
  sitemapContent,
  isRecursive,
  filename,
  isDuplicate
}) {
  let output = []
  let urls = []
  let xml = null

  if (baseURL) {
    xml = await fetchXML(baseURL)
  } else {
    xml = sitemapContent
  }

  urls = extractUrls(xml)

  if (isRecursive) {
    console.log('Doing Recursive... Please wait...')
    const pendingURLArray = urls.map(url => isURLXML(url) && fetchXML(url))
    const newUrls = await axios.all(pendingURLArray).then(responseArr => {
      return responseArr.map(xml => extractUrls(xml))
    })
    output = newUrls.reduce((acc, url) => {
      acc.push(...url)
      return acc
    }, urls)
  } else {
    output = urls
  }

  if (isDuplicate) {
    output = output.reduce(function(acc, url) {
      if (!acc.includes(url)) {
        acc.push(url)
      }

      return acc
    }, [])
  }

  if (filename) {
    saveOutput(output, filename)
    console.log(`${output.length}, items saved at ${path.resolve(filename)}`)
  }

  return output
}

module.exports = {
  main,
  isURL
}
