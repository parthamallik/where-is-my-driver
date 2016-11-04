/*
 * Name			: test/restCall.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: To make rest Calls
 *
 */

"use strict";

exports.HttpCall = function(options, callback) {
	var protocol = require('http'),
		statusCodes = require('http').STATUS_CODES,
		self = this;

	// See if the options are ok, otherwise add what we need
	if (options.method === 'POST' || options.method === 'PUT') {
		if (!options.headers) options.headers = {};

		if (!options.headers['Content-Type'])
			options.headers['Content-Type'] = 'application/json';

		if (!options.headers['Content-Length'])
			options.headers['Content-Length'] = Buffer.byteLength(options.data);
	}

	// Here is the meat and potatoes for executing the request
	var request = protocol.request(options, function(response) {
		var data = null;
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
			if (!data) data = chunk;
			else data += chunk;
		});

		response.on('end', function() {
			var errorObj = null;
			if(response.statusCode != '200') {
				errorObj = {
					'code': response.statusCode,
					'path': options.path,
					'message': statusCodes[response.statusCode]
				};
			}
			if (callback) callback(errorObj, data);
		});
	});

	request.on('error', function(err) {
		if (callback) callback(err, null);
	});

	// Now that the infrastructure is setup, write the data
	if (options.method === 'POST' || options.method === 'PUT') {
		//console.log(s);
		request.write(options.data);
	}

	// Tell node we are done, so it actually executes
	request.end();
};
