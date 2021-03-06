'use strict';
// @ts-ignore
import * as https from 'https'
import * as http from 'http'
import * as Promise from 'bluebird'
import * as url from 'url'
import * as utils from "./utils";
import * as settle from "./core/settle";
import * as createError from "./core/createError";
import * as enhanceError from "./core/enhanceError";

const zlib = require('zlib');
const config = require('./defaults');

const isHttps = /https:?/;

export class ApiClient {

    client? : http.Agent = undefined;
    APIToken = '';
    successRange = [200, 201, 202];
    BASE_URL = '';
    urlData: url.UrlWithStringQuery;

    constructor(baseURL: string, hasToken = false, requestTokenCallBack: (client: any, url: url.UrlWithStringQuery) => Promise<string> = () => {
        return new Promise<string>(() => {
        })
    }, autoTokenRenew = false, renewTimeMS = 1197000) {
        this.BASE_URL = baseURL;

        this.urlData = url.parse(this.BASE_URL);
        const protocol = this.urlData.protocol || 'http:';

        const isHttpsRequest = isHttps.test(protocol);

        if(isHttpsRequest) {
            this.client = new https.Agent();
        } else{
            this.client = new http.Agent();
        }

        if (hasToken) {
            requestTokenCallBack(this, this.urlData).then(result => {

                // @ts-ignore
                this.APIToken = result["access_token"];
                // @ts-ignore
                if(result["expires_in"]){
                    setTimeout(()=>{requestTokenCallBack(this, this.urlData).then(result => {
                        // @ts-ignore
                        this.APIToken = result["access_token"]
                        // @ts-ignore
                    })},parseInt(result["expires_in"]))
                }
                // console.log(this.APIToken, result)
            });
            // console.log('token',this.APIToken);
            if (autoTokenRenew) {
                setInterval(() => {
                    requestTokenCallBack(this, this.urlData).then(result => {
                        // @ts-ignore
                        this.APIToken = result["access_token"]
                    })
                }, renewTimeMS);
            }
        }
    }

    callAPI(method: string, URI: string, data: any = null, custom_header: any = {
        "Authorization": "Bearer " + this.APIToken,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }) {
        return new Promise((resolvePromise, rejectPromise) => {
            let timer: NodeJS.Timeout;
            const resolve = function resolve(value: any) {
                clearTimeout(timer);
                resolvePromise(value);
            };
            const reject = function reject(value: any) {
                clearTimeout(timer);
                rejectPromise(value);
            };
            // console.log(this.BASE_URL + URI, method)
            // this.client.registerMethod("jsonMethod", this.BASE_URL + URI, method);
            if (data && !utils.isStream(data)) {
                if (Buffer.isBuffer(data)) {
                    // Nothing to do...
                } else if (utils.isArrayBuffer(data)) {
                    data = Buffer.from(new Uint8Array(data));
                } else if (utils.isString(data)) {
                    data = Buffer.from(data, 'utf-8');
                } else {
                    return reject(createError(
                        'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                        config
                    ));
                    // return reject(false)
                }
                custom_header['Content-Length'] = data.length;
            }

            const requestOptions = {
                hostname: this.urlData.hostname,
                path: this.urlData.path ? this.urlData.path + URI : URI,
                headers: custom_header,
                port: this.urlData.port ? this.urlData.port : (isHttps ? 443 : 80),
                method: method
            };

            const req = (isHttps? https : http).request(requestOptions,
                (res) => {
                    if (req.aborted) return;

                    // uncompress the response body transparently if required
                    let stream = res;
                    switch (res.headers['content-encoding']) {
                        /*eslint default-case:0*/
                        case 'gzip':
                        case 'compress':
                        case 'deflate':
                            // add the unzipper to the body stream processing pipeline
                            stream = stream.pipe(zlib.createUnzip());

                            // remove the content-encoding in order to not confuse downstream operations
                            delete res.headers['content-encoding'];
                            break;
                    }

                    const response = {
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        headers: res.headers,
                        config: config,
                        request: req
                    };

                    if (config.responseType === 'stream') {
                        // @ts-ignore
                        response.data = stream;
                        settle(resolve, reject, response);
                    } else {
                        let responseBuffer: any[] | never[] | Uint8Array[] = [];
                        stream.on('data', function handleStreamData(chunk) {
                            // @ts-ignore
                            responseBuffer.push(chunk);

                            // make sure the content length is not over the maxContentLength if specified
                            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
                                reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                                    config, undefined, req));
                            }
                        });

                        stream.on('error', function handleStreamError(err) {
                            if (req.aborted) return;
                            // @ts-ignore
                            reject(enhanceError(err, config, undefined, req));
                        });

                        stream.on('end', function handleStreamEnd() {
                            const responseData = Buffer.concat(responseBuffer).toString();

                            resolve(config.transformResponse(responseData))
                        });
                    }
                });

            req.on('error', (e) => {
                console.error(e);
            });
            if(data) {
                req.write(data);
            }
            req.end();
        });
    }
}