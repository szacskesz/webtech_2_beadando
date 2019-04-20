const assert = require('assert');
const WindowClass = require('../../models/Window');
const ShutterClass = require('../../models/Shutter');

describe('Windows class tests', () => {
    it('test WindowFromJson with undefined', () => {
        try {
            let window = new WindowClass.WindowFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): window cannot be undefined")
        }
    })

    it('test Window with undefined width', () => {
        try {
            let width = undefined;
            let height = 300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): width cannot be undefined")
        }
    })

    it('test Window with undefined height', () => {
        try {
            let width = 100;
            let height = undefined;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): height cannot be undefined")
        }
    })

    it('test Window with undefined shutter', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = undefined;
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): shutter cannot be undefined")
        }
    })

    it('test Window with string width', () => {
        try {
            let width = "100";
            let height = 300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): width must be a number")
        }
    })

    it('test Window with string height', () => {
        try {
            let width = 100;
            let height = "300";
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): height must be a number")
        }
    })

    it('test Window with string shutter', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = "shutter";
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.ok(true);
        }
    })

    it('test Window with negative width', () => {
        try {
            let width = -100;
            let height = 300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): width must be a positive number")
        }
    })

    it('test Window with negative height', () => {
        try {
            let width = 100;
            let height = -300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): height must be a positive number")
        }
    })

    it('test Window with zero width', () => {
        try {
            let width = 0;
            let height = 300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): width must be a positive number")
        }
    })

    it('test Window with zero height', () => {
        try {
            let width = 100;
            let height = 0;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Window): height must be a positive number")
        }
    })

    it('test Window with normal inputs', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = new ShutterClass.Shutter("white", "wood", "basic", false);
            let window = new WindowClass.Window(width, height, shutter);
        } catch (error) {
            assert.fail();
        }
    })
})