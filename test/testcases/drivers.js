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
    rest = promises.promisifyAll(require('../restCall.js')),
    promises = require('bluebird'),
    LOAD = 100;

describe('Add drivers', function() {
    before(function(done) {
        done();
    });

    var drivers = Array.from(Array(LOAD), (x, i) => i + 1);

    drivers.forEach(function(id) {
        it('Adding driver detail for id ' + id, function(done) {

            var options = {
                'host': "127.0.0.1",
                'port': "9001",
                'path': '/drivers/#id#/location',
                'method': 'PUT',
                'data': {}
            };
            options.path = options.path.replace("#id#", id);

            options.data = JSON.stringify({
                'longitude': Math.round(Math.random()) == 0 ? (Math.round(Math.random() * (180) * 10000) / 10000) : (Math.round(Math.random() * (180) * 10000) / 10000) * -1,
                'latitude': Math.round(Math.random()) == 0 ? (Math.round(Math.random() * (90) * 10000) / 10000) : (Math.round(Math.random() * (90) * 10000) / 10000) * -1,
                'accuracy': Math.round(Math.random() * 10) / 10
            });

            rest.HttpCallAsync(options)
                .then(function(response) {
                    done(null);
                })
                .catch(function(err) {
                    done(err);
                });

        });
    });

    var seed = [{
        "id": 1,
        "longitude": 100.11,
        "latitude": 50.11,
        "accuracy": 0.5
    }, {
        "id": 2,
        "longitude": 100.112,
        "latitude": 50.12,
        "accuracy": 0.2
    }, {
        "id": 3,
        "longitude": 100.121,
        "latitude": 50.11,
        "accuracy": 0
    }, {
        "id": 4,
        "longitude": 100.115,
        "latitude": 50.115,
        "accuracy": 0.7
    }, {
        "id": 5,
        "longitude": 100.12,
        "latitude": 50,
        "accuracy": 0.5
    }];

    seed.forEach(function(driver) {
        it('Updating driver detail for id ' + driver.id, function(done) {

            var options = {
                'host': "127.0.0.1",
                'port': "9001",
                'path': '/drivers/#id#/location',
                'method': 'PUT',
                'data': {}
            };
            options.path = options.path.replace("#id#", driver.id);

            options.data = JSON.stringify({
                'longitude': driver.longitude,
                'latitude': driver.latitude,
                'accuracy': driver.accuracy
            });

            rest.HttpCallAsync(options)
                .then(function(response) {
                    done(null);
                })
                .catch(function(err) {
                    done(err);
                });

        });
    });

    it('Negetive test case: wrong driver id ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/#id#/location',
            'method': 'PUT',
            'data': {}
        };
        options.path = options.path.replace("#id#", 60000);

        options.data = JSON.stringify({
            'longitude': 100,
            'latitude': 50,
            'accuracy': 0
        });

        rest.HttpCallAsync(options)
            .then(function(response) {
                done("Should not complete successfully !");
            })
            .catch(function(err) {
                assert.equal(err.code, 404, "Should be Incorrect driver");
                done(null);
            });
    });

    it('Negetive test case: incorrect parameter ', function(done) {
        var options = {
            'host': "127.0.0.1",
            'port': "9001",
            'path': '/drivers/#id#/location',
            'method': 'PUT',
            'data': {}
        };
        options.path = options.path.replace("#id#", 30);

        options.data = JSON.stringify({
            'longitude': 200,
            'latitude': 50,
            'accuracy': 0
        });

        rest.HttpCallAsync(options)
            .then(function(response) {
                done("Should not complete successfully !");
            })
            .catch(function(err) {
                assert.equal(err.code, 422, "Should be incorrect longitude");
                done(null);
            });
    });

    after(function(done) {
        done();
    });

});
