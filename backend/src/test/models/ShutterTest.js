const assert = require('assert');
const ShutterClass = require('../../models/Shutter');

describe('Shutter class tests', () => {
    it('test ShutterFromJson with undefined', () => {
        try {
            let shutter = new ShutterClass.ShutterFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): shutter cannot be undefined")
        }
    })

    it('test Shutter with undefined color', () => {
        try {
            let color = undefined;
            let material = "wood";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): color cannot be undefined")
        }
    })

    it('test Shutter with undefined material', () => {
        try {
            let color = "white";
            let material = undefined;
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): material cannot be undefined")
        }
    })

    it('test Shutter with undefined type', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = undefined;
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): type cannot be undefined")
        }
    })

    it('test Shutter with undefined isFinished', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = "basic";
            let isFinished = undefined;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): isFinished cannot be undefined")
        }
    })

    it('test Shutter with integer color', () => {
        try {
            let color = 1;
            let material = "wood";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): color must be a string")
        }
    })

    it('test Shutter with integer material', () => {
        try {
            let color = "white";
            let material = 1;
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): material must be a string")
        }
    })

    it('test Shutter with integer type', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = 1;
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): type must be a string")
        }
    })

    it('test Shutter with integer isFinished', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = "basic";
            let isFinished = 1;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): isFinished must be a boolean")
        }
    })

    it('test Shutter with empty color', () => {
        try {
            let color = "";
            let material = "wood";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): color cannot be empty string")
        }
    })

    it('test Shutter with empty material', () => {
        try {
            let color = "white";
            let material = "";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): material cannot be empty string")
        }
    })

    it('test Shutter with empty type', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = "";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Shutter): type cannot be empty string")
        }
    })

    it('test Shutter with normal inputs', () => {
        try {
            let color = "white";
            let material = "wood";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
        } catch (error) {
            assert.fail();
        }
    })
})