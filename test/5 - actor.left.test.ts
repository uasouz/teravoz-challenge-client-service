import * as chai from 'chai';
import {app} from "../src";

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = require('chai').expect;
const request = require('chai').request;
var should = require('chai').should();


describe('Test ActorLeft Event', function () {
    before((done) => {
        done()
    });

    it("Test POST ActorLeft WebHook First Time", (done) => {
        const requestBody = {
            "type": "actor.left",
            "call_id": "1463669263.30041",
            "code": "123456",
            "actor": "vlopes45@gmail.com",
            "number": "200",
            "queue": "900",
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

    it("Test POST ActorLeft WebHook Coming back", (done) => {
        const requestBody =  {
            "type": "actor.left",
            "call_id": "1463669263.30041",
            "code": "123456",
            "actor": "vlopes45@gmail.com",
            "number": "200",
            "queue": "900",
            "timestamp": (new Date()).toISOString()
        };
        request(app).post("/webhook")
            .send(requestBody)
            .end((err: any, res: any) => {
                expect(res.statusCode).to.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.event.should.have.a.property("actor");
                res.body.data.event.actor.should.be.equal("vlopes45@gmail.com");
                done();
            })
    });

    after((done => {
        done()
    }))
});