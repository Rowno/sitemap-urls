# Sitemap Urls

[![Build Status](https://api.travis-ci.org/Rowno/sitemap-urls.svg?branch=master)](https://travis-ci.org/Rowno/sitemap-urls)
[![Dependency Status](https://david-dm.org/Rowno/sitemap-urls/status.svg)](https://david-dm.org/Rowno/sitemap-urls)

Extract URLs Recersively from an XML sitemap.

![Sitemap Urls screenshot](screenshot.png)

## Features

- Variant Input like, File, URL, Piping
- Recursive extracting
- Save output to file
- Duplicate entry remove

## Getting Started

Install the Sitemap Urls command line tool:

```bash
npm install -g sitemap-urls
# or
yarn add -g sitemap-urls
```

Run `sitemap-urls` with a sitemap URL:

```bash
sitemap-urls -r https://example.com
```

also support file

```bash
sitemap-urls sitemap.xml
```

Also supports piping:

```bash
curl http://example.com/sitemap.xml | sitemap-urls
```

## Usage

### CLI

```
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
```

### API

```javascript
main(
    isRecursive: boolean,
    filename: boolean,
    sitemapContent: string,
    isDuplicate: boolean,
    baseURL: string
  }) -> array
```

Extracts URLs Recersively from a string containing an XML sitemap OR URL.

Example result:

```json
["http://example.com/", "http://example.com/test/"]
```

## Related

- [medic][] - Perform bulk URL status checks and track changes.

## License

Sitemap Urls is released under the MIT license.

Copyright © 2015 Roland Warmerdam.

[medic]: https://github.com/Rowno/medic
