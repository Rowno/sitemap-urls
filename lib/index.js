'use strict';
var cheerio = require('cheerio');


function extractUrls(xml) {
    var urls = [];
    var $ = cheerio.load(xml, {xmlMode:true});

    $('url').each(function () {
        var $this = $(this);
        var url = $this.find('loc').text();

        if (urls.indexOf(url) === -1) {
            urls.push(url);
        }
    });

    return urls;
}

exports.extractUrls = extractUrls;
