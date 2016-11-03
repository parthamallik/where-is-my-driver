/*
 * Name			: helpers/database.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: All interaction with the postgres DB
 *
 */

"use strict";

var config = require('../config.js')[process.env.NODE_ENV],
    logger = require('./logger.js').getLoggerObject(),
    promises = require('bluebird'),
    bookshelf = require('bookshelf'),
    knex = require('knex'),
    databaseConnection = null;

var _init = function() {
    databaseConnection = bookshelf(knex(config.database));
    databaseConnection.knex.client.on('notice', function(msg) {
        logger.info('Postgres message..', msg);
    });
    databaseConnection.knex.client.on('error', function(err) {
        logger.info('Postgres error..', err);
    });
};

var _dbOperations = {
    'read': function(callback) {

    },
    'write': function(callback) {

    }
};

var _operationController = function() {
    if (!databaseConnection) {
        _init();
    }
    return _dbOperations;
};

exports.getDbOperations = _operationController;
