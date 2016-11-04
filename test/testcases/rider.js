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
    promises = require('bluebird'),
    rest = promises.promisifyAll(require('../restCall.js'));

describe('Find driver accurately ', function() {
    before(function(done) {
        done();
    });

    it('Drivers within 100 meters ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/?latitude=50.11&longitude=100.11&radius=100',
            'method': 'GET',
            'data': {}
        };

        rest.HttpCallAsync(options)
            .then(function(response) {
                response = JSON.parse(response);
                assert.equal(response.length, 1, "One driver should be found.");
                done(null);
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('Drivers within (default) ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/?latitude=50.115&longitude=100.11',
            'method': 'GET',
            'data': {}
        };

        rest.HttpCallAsync(options)
            .then(function(response) {
                response = JSON.parse(response);
                assert.equal(response.length, 1, "One driver should be found.");
                done(null);
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('Drivers within 1 KM ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/?latitude=50.115&longitude=100.11&radius=2000',
            'method': 'GET',
            'data': {}
        };

        rest.HttpCallAsync(options)
            .then(function(response) {
                response = JSON.parse(response);
                assert.equal(response.length, 4, "4 drivers should be found.");
                done(null);
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('Only 2 Drivers within 1 KM  ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/?latitude=50.115&longitude=100.11&radius=2000&limit=2',
            'method': 'GET',
            'data': {}
        };

        rest.HttpCallAsync(options)
            .then(function(response) {
                response = JSON.parse(response);
                assert.equal(response.length, 2, "Only 2 driver should be found.");
                done(null);
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('Negetive test case: wrong latitude ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/?latitude=500.115&longitude=100.11&radius=2000&limit=2',
            'method': 'GET',
            'data': {}
        };

        rest.HttpCallAsync(options)
            .then(function(response) {
                response = JSON.parse(response);
                done("Should not complete successfully !");
            })
            .catch(function(err) {
                assert.equal(err.code, 400, "Should be a bad request");
                done(null);
            });
    });

    after(function(done) {
        done();
    });
});
