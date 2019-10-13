import * as chai from 'chai';
import {app} from "../src";

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = require('chai').expect;
const request = require('chai').request;
var should = require('chai').should();


describe('Test CallFinished Event', function () {
    before((done) => {
        done()
    });

    it("Test POST CallFinished WebHook Success", (done) => {
        const requestBody = {
            "type": "call.finished",
            "call_id": "1463669263.30041",
            "code": "123456",
            "direction": "inbound",
            "our_number": "0800000000",
            "their_number": "11991910000",
            "timestamp": (new Date()).toISOString()
        };
        request(app).post("/webhook")
            .send(requestBody)
            .end((err: any, res: any) => {
                expect(res.statusCode).to.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            })
    });

    it("Test POST CallFinished WebHook Failure", (done) => {
        const requestBody =  {
            "type": "call.finished",
            "call_id": "1463669263.30041",
            "code": "123456",
            "direction": "inbound",
            "our_number": "0800000000",
            "their_number": "11991910000",
            "timestamp": (new Date()).toISOString()
        };
        request(app).post("/webhook")
            .send(requestBody)
            .end((err: any, res: any) => {
                expect(res.statusCode).to.equal(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            })
    });

    after((done => {
        done()
    }))
});