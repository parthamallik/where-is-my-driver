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
    var longitude = request.query.longitude,
        latitude = request.query.latitude,
        radius = request.query.radius || 500,
        limit = request.query.limit || 10;

    logger.debug('Find driver request ', request.query);

    // Check for missing parameters
    if (!longitude || !latitude) {
        logger.error('Missing details in find driver request ', request.query);
        response.status(errors.ERR_WRONG_PARAMETER.code).json(errors.ERR_MISSING_PARAMETER.message);
        return;
    }

    // Check for invalid parameters
    if (isNaN(radius) || isNaN(limit)) {
        logger.error('Incorrect parameters ', request.query);
        response.status(errors.ERR_WRONG_PARAMETER.code).json(errors.ERR_WRONG_PARAMETER.message);
        return;
    }

    // Check for Invalid geometry
    var status = utilities.validateGeometry(longitude, latitude, 0 /* faking the last one */);
    if (status.errors && status.errors.length > 0) {
        logger.error('Invalid geometry for find driver request', request.query);
        response.status(errors.ERR_WRONG_PARAMETER.code).json(status);
        return;
    } else {
        // Update driver information
        dbOperationsAsync.findDriverAsync(longitude, latitude, radius, limit)
        .then(function(data) {
            response.status(200).json(data);
        })
        .catch(function(err) {
            logger.error('Could not find driver. Error', err);
            response.status(400).json({"errors": [errors.ERR_GENERIC.message]});
        })
    }
};

exports.findMyDriver = _findMyDriver;
