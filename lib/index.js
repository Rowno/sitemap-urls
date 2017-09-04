'use strict';
var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = require('request-promise');
var timeout;
var requester;
var urls = [];

function extractSingleUrl(url) {
    return new Promise(function (resolve) {
        if (url.search(/\.xml$/) === -1) {
            urls.push(url);
            resolve();
        } else {
            return requester.get(url).then(function (body) {
                console.error('Retrieving nested remote sitemap (%s)', url);
                resolve(Promise.all(walkUrls(body, url)));
            }).catch(function () {
                console.error('ERROR: A sitemap failed to load from the network (%s)', url);
            });
        }
    });
}

function walkUrls(xml, url) {
    var $ = cheerio.load(xml, { xmlMode: true });
    var locs = [];

    if ($('loc').length === 0) {
        // display warning but don't fail promise
        console.error('WARNING: Empty sitemap (%s)', url);

        return new Promise(function (resolve) {
            resolve([]);
        });
    } else {
        // avoid cheerio objects and use std arrays
        $('loc').map(function () {
            locs.push($(this).text().trim());
            return true;
        });

        return locs.map(extractSingleUrl);
    }
}

function extractUrls(xml, cliFlags) {
    if (cliFlags) {
        if (cliFlags.timeout) {
            timeout = parseInt(cliFlags.timeout, 10);
            timeout = isNaN(timeout) ? 10000 : timeout;
        }
        requester = request.defaults({ timeout: timeout });
    }

    return Promise.all(walkUrls(xml)).then(function () {
        urls.map(function (url) {
            console.log(url);
            return true;
        });
        
        return urls;
    });
}

exports.extractUrls = extractUrls;
