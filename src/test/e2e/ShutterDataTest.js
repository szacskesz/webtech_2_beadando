const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

chai.use(chaiHttp);
var assert = require('chai').assert

describe("ShutterData e2e tests", () => {
    step("should get all shutter colors", (done) => {
        chai.request(app)
            .get('/shutter-data/getAllShutterColors')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.colors, 'array');

                for (let i = 0; i < res.body.colors.length; i++) {
                    assert.match(res.body.colors[i]._id, checkForHexRegExp);
                    assert.typeOf(res.body.colors[i].color, 'string');
                    assert.notEqual(res.body.colors[i].color, "");
                }
                
                done();
            });
    });

    step("should get all shutter materials", (done) => {
        chai.request(app)
            .get('/shutter-data/getAllShutterMaterials')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.materials, 'array');

                for (let i = 0; i < res.body.materials.length; i++) {
                    assert.match(res.body.materials[i]._id, checkForHexRegExp);
                    assert.typeOf(res.body.materials[i].material, 'string');
                    assert.notEqual(res.body.materials[i].material, "");
                }
                
                done();
            });
    });

    step("should get all shutter types", (done) => {
        chai.request(app)
            .get('/shutter-data/getAllShutterTypes')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.types, 'array');

                for (let i = 0; i < res.body.types.length; i++) {
                    assert.match(res.body.types[i]._id, checkForHexRegExp);
                    assert.typeOf(res.body.types[i].type, 'string');
                    assert.notEqual(res.body.types[i].type, "");
                }
                
                done();
            });
    });
});