const assert = require('assert');
const ShutterDataService = require('../../service/ShutterDataService');

describe('ShutterDataService tests', () => {
    it('test ShutterDataService can be constructed', () => {
        const shutterDataService = new ShutterDataService();

        if(shutterDataService !== undefined && shutterDataService !== null) {
            assert.ok(true);
        } else{
            assert.ok(false);
        }
    })

    it('test ShutterDataService getAllShutterColors with success', () => {
        const dao = {
            getAllShutterColors : function(successC, errorC){
                successC(["1","2"]);
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterColors(
            (resp) => {
                assert.deepEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test ShutterDataService getAllShutterColors with error', () => {
        const dao = {
            getAllShutterColors : function(successC, errorC){
                errorC("error");
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterColors(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    })

    it('test ShutterDataService getAllShutterMaterials with success', () => {
        const dao = {
            getAllShutterMaterials : function(successC, errorC){
                successC(["1","2"]);
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterMaterials(
            (resp) => {
                assert.deepEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test ShutterDataService getAllShutterMaterials with error', () => {
        const dao = {
            getAllShutterMaterials : function(successC, errorC){
                errorC("error");
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterMaterials(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    })

    it('test ShutterDataService getAllShutterTypes with success', () => {
        const dao = {
            getAllShutterTypes : function(successC, errorC){
                successC(["1","2"]);
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterTypes(
            (resp) => {
                assert.deepEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test ShutterDataService getAllShutterTypes with error', () => {
        const dao = {
            getAllShutterTypes : function(successC, errorC){
                errorC("error");
            }
        }
        const shutterDataService = new ShutterDataService(dao);

        shutterDataService.getAllShutterTypes(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    })
})