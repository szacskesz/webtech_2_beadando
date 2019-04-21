var ShutterClass = require("./Shutter");

function Window(width, height, shutter) {
    if(width === undefined) {
        throw "Error(Window): width cannot be undefined";
    }
    if(height === undefined) {
        throw "Error(Window): height cannot be undefined";
    }
    if(shutter === undefined) {
        throw "Error(Window): shutter cannot be undefined";
    }

    if(typeof width !== 'number') {
        throw "Error(Window): width must be a number";
    }
    if(typeof height !== 'number') {
        throw "Error(Window): height must be a number";
    }

    if(width <= 0) {
        throw "Error(Window): width must be a positive number";
    }

    if(height <= 0) {
        throw "Error(Window): height must be a positive number";
    }

    this.width =  width;
    this.height =  height;
    this.shutter = new ShutterClass.ShutterFromJson(shutter);
}

function WindowFromJson(window) {
    if(window === undefined) {
        throw "Error(Window): window cannot be undefined";
    }

    return new Window(window.width, window.height, window.shutter);
}

module.exports = {
    Window: Window,
    WindowFromJson: WindowFromJson
};