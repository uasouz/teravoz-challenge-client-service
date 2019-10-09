'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers: { [x: string]: any; }, normalizedName: string) {
    utils.forEach(headers, function processHeader(value: any, name: string) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};