/*
 * Name			: helpers/database.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: All interaction with the postgres DB
 *
 */

"use strict";

var path = require('path'),
    config = require('../config.js')[process.env.NODE_ENV],
    logger = require('./logger.js').getLoggerObject(),
    promises = require('bluebird'),
    bookshelf = require('bookshelf'),
    knex = require('knex'),
    databaseConnection = null,
    queries = require(path.join(__dirname, './query.js'))['sqls'];

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
    'updateDriver': function(id, longitude, latitude, accuracy, callback) {
        var query = queries['updateDriver'];
        query = query.replace(/#id#/g, id)
            .replace(/#longitude#/g, longitude)
            .replace(/#latitude#/g, latitude)
            .replace(/#accuracy#/g, accuracy);

        logger.debug('Raw query for driver update', query);
        databaseConnection.knex.raw(query)
        .then(function(result){
            callback(null,result);
        })
        .catch(function(err){
            logger.error('Could not run query. Error:', err)
            callback(err);
        });
    },
    'findDriver': function(longitude, latitude, radius, limit, callback) {

    }
};

var _operationController = function() {
    if (!databaseConnection) {
        _init();
    }
    return _dbOperations;
};

exports.getDbOperations = _operationController;
