/*
 * Name			: helpers/logger.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: A winston logger to be used by the application
 *
 */

"use strict";

var config = require('../config.js')[process.env.NODE_ENV],
    winston = require('winston'),
    logger = null;

var _getLogger = function() {
    if (!logger) {
        logger = new(winston.Logger)({
            transports: [
                new(winston.transports.Console)(config['logger'].console),
                new(winston.transports.File)(config['logger'].file)
            ]
        });
    }
    return logger;
};

exports.getLoggerObject = _getLogger;
