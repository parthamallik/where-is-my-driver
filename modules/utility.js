/*
 * Name			: modules/utility.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * License		: MITNFA
 * Description	: Some common utility function like validation of  geometry coordinates.
 *
 */

"use strict";

var errors = require('../errors.js').english;

exports.validateGeometry = function(longitude,latitude, accuracy) {
    var response = {'errors':[]};

    if(isNaN(accuracy) || Math.abs(accuracy) > 1) {
        response.errors.push(errors.ERR_ACCURACY_INVALID.message);
    }
    if(isNaN(longitude) || Math.abs(longitude) > 180) {
        response.errors.push(errors.ERR_LONGITUDE_INVALID.message);
    }
    if(isNaN(latitude) || Math.abs(latitude) > 90) {
        response.errors.push(errors.ERR_LATITUDE_INVALID.message);
    }
    return response;
}
