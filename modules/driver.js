/*
 * Name			: modules/driver.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: Store, maintain drivers details.
 *
 */

"use strict";

var logger = require('../helpers/logger.js').getLoggerObject(),
    utilities = require('./utility.js'),
    promises = require('bluebird'),
    errors = require('../errors.js').english,
    dbOperationsAsync = promises.promisifyAll(require('../helpers/database.js').getDbOperations());

var _createUpdateDetails = function(request, response, next) {

    logger.debug('Update driver request ', request.body);

    // Check for Invalid driver id
    if(request.params.id < 1 || request.params.id > 50000) {
        logger.error('Invalid driver id for update driver request', request.params.id);
        response.status(errors.ERR_INVALID_DRIVER.code).json(errors.ERR_INVALID_DRIVER.message);
        return;
    }
    // Check for semantics correctness of request body
    if(!request.body.longitude || !request.body.latitude ) {
        logger.error('Missing details in request body for ', request.params.id, request.body);
        response.status(errors.ERR_MISSING_PARAMETER.code).json(errors.ERR_MISSING_PARAMETER.message);
        return;
    }
    // Check for Invalid geometry
    var status = utilities.validateGeometry(request.body.longitude, request.body.latitude, request.body.accuracy);
    if(status.errors && status.errors.length > 0) {
        logger.error('Invalid geometry for update driver request', request.body);
        response.status(errors.ERR_GENERIC.code).json(status);
        return;
    } else {
        // Update driver information
        dbOperationsAsync.updateDriverAsync(request.params.id, request.body.longitude, request.body.latitude, request.body.accuracy)
        .then(function(data) {
            logger.debug('Driver updated successfully for driver id', request.params.id);
            response.status(200).json({});
        })
        .catch(function(err) {
            logger.error('Could not update driver details. Error', err);
            response.status(errors.ERR_GENERIC.code).json({"errors": [errors.ERR_GENERIC.message]});
        })
    }
};

exports.createUpdateDetails = _createUpdateDetails;
