/*
 * Name			: modules/rider.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: All the operations performed by a rider.
 *
 */

"use strict";

var logger = require('../helpers/logger.js').getLoggerObject(),
    utilities = require('./utility.js'),
    promises = require('bluebird'),
    errors = require('../errors.js').english,
    dbOperationsAsync = promises.promisifyAll(require('../helpers/database.js').getDbOperations());

var _findMyDriver = function(request, response, next) {

};

exports.findMyDriver = _findMyDriver;
