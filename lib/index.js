'use strict';
var Promise = require("bluebird");
var cheerio = require('cheerio');
var request = require('request-promise');
var timeout;
var proxy;
var requester;
var urls = [];

function extractUrls(xml, cliFlags) {
	if(cliFlags) {
		if(cliFlags.timeout)
			timeout = (typeof(parseInt(cliFlags.timeout)) === "number")? parseInt(cliFlags.timeout) : 10000;
		requester = request.defaults({ timeout: timeout });
	}

	return Promise.all(walkUrls(xml)).then(function(){
		urls.map(function(url){console.log(url)});
		return urls;
	});
}


function walkUrls(xml, url) {
	var $ = cheerio.load(xml, { xmlMode: true });
	var locs = [];

	if($('loc').length !==0) {
		// avoid cheerio objects and use std arrays
		$('loc').map(function(){
			locs.push($(this).text().trim());
		});

		return locs.map(extractSingleUrl);
	} else {
		// display warning but don't fail promise
		console.error("WARNING: Empty sitemap (%s)", url);
		return new Promise(function(resolve, reject) {
			resolve([]);
		});
	}
}


function extractSingleUrl(url) {
	return new Promise(function(resolve, reject) {
		if (url.search(/\.xml$/) !== -1) {
			return requester.get(url).then(function (body){
				console.error("Retrieving nested remote sitemap (%s)", url);
				resolve(Promise.all(walkUrls(body, url)));
			}).catch(function(err){
				console.error("ERROR: A sitemap failed to load from the network (%s)", url);
			});
		} else {
			urls.push(url);
			resolve();
		}
	});
}


exports.extractUrls = extractUrls;
