'use strict';
import * as utils from "./utils";
const normalizeHeaderName = require('./helpers/normalizeHeaderName');

const DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers: { [x: string]: any; }, value: string) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}

// function getDefaultAdapter() {
//     let adapter;
//     // Only Node.JS has a process variable that is of [[Class]] process
//     if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
//         // For node use HTTP adapter
//         adapter = require('./http');
//     } else if (typeof XMLHttpRequest !== 'undefined') {
//         // For browsers use XHR adapter
//         adapter = require('./adapters/xhr');
//     }
//     return adapter;
// }

const defaults = {
    // adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data: { buffer: any; toString: () => void; }, headers: { [x: string]: any; }) {
        normalizeHeaderName(headers, 'Content-Type');
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isArrayBufferView(data)) {
            return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
        }
        return data;
    }],

    transformResponse: function transformResponse(data: any) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) { /* Ignore */ }
        }
        return data;
    },

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,

    validateStatus: function validateStatus(status: number) {
        return status >= 200 && status < 300;
    }
};

// @ts-ignore
defaults.headers = {
    common: {
        'Accept': 'application/json, text/plain, */*'
    }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method: string | number) {
    // @ts-ignore
    defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method: string | number) {
    // @ts-ignore
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
