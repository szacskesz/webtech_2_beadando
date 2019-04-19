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
    //TODO
    // if(shutter instanceof Shutter) { 
    //     throw "Error(Window): address must be a string";
    // }

    if(width <= 0) {
        throw "Error(Window): width must be a positive number";
    }

    if(height <= 0) {
        throw "Error(Window): height must be a positive number";
    }

    this.width =  width; //must
    this.height =  height; //must
    this.shutter = shutter; //must be present
}

module.exports = {
    Window: Window
};