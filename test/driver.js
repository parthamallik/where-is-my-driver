/*
 * Name			: test/driver.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: To test the driver apis
 *
 */

"use strict";

var assert = require('chai').assert,
    path = require('path'),
    drivers_data = require('./drivers_data.js')['seed'],
    promises = require('bluebird');


describe('Add drivers', function() {
    before(function(done) {
        done();
    });

    drivers_data.forEach(function(driver) {
        it('Add driver' + driver.id, function(done) {
            console.log('Adding', driver);
            done();
        })
    })
    
    after(function(done) {
        done();
    });
});
