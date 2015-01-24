'use strict';
var cheerio = require('cheerio');


function extractUrls(xml) {
    var urls = [];
    var $ = cheerio.load(xml, {xmlMode:true});

    $('loc').each(function forEachLoc() {
        var url = $(this).text();

        if (urls.indexOf(url) === -1) {
            urls.push(url);
        }
    });

    return urls;
}

exports.extractUrls = extractUrls;
