/*
 * Name			: index.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: The http server to handle incoming requests
 *
 */

"use strict";

/*
 * Load the configurations and other
 * modules needed for setting up the express server
 */
var config = require('./config.js')[process.env.NODE_ENV],
    logger = require('./helpers/logger.js').getLoggerObject(),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    debounce = require('connect-debounce'),
    timeout = require('connect-timeout'),
    gatewayServer = express();

gatewayServer
    .use(debounce()) // To prevent DOS and DDOS attacks
    .use(cors()) // Enable CORS
    .use(timeout(10000)) // Do't want server to take more than 10 seconds to respond
    .use(bodyParser.json()) // Accepts json body max to 100 kb default
    .use(bodyParser.text()) // Accepts text body max to 100 kb default
    .use(bodyParser.urlencoded({
        'extended': true
    })); // Parse urlencoded body with qs library

gatewayServer.listen(config['webserver'].port, function() {
    logger.info('Server started in', process.env.NODE_ENV, 'mode.');
    logger.info('Listening on ', config['webserver'].port);
});
