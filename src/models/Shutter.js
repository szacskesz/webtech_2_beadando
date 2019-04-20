var counter = (function(){
    var cnt = 0;
    return function(){
        cnt++;
        return cnt;
    }
})();

function Shutter(color, material, type, isFinished) {
    if(color === undefined) {
        throw "Error(Shutter): color cannot be undefined";
    }
    if(material === undefined) {
        throw "Error(Shutter): material cannot be undefined";
    }
    if(type === undefined) {
        throw "Error(Shutter): type cannot be undefined";
    }
    if(isFinished === undefined) {
        throw "Error(Shutter): isFinished cannot be undefined";
    }

    if(typeof color !== 'string') {
        throw "Error(Shutter): color must be a string";
    }
    if(typeof material !== 'string') {
        throw "Error(Shutter): material must be string";
    }
    if(typeof type !== 'string') {
        throw "Error(Shutter): type must be string";
    }
    if(typeof isFinished !== 'boolean') {
        throw "Error(Shutter): isFinished must be a boolean";
    }

    this.id = counter();
    this.color =  color;
    this.material = material;
    this.type = type;
    this.isFinished = isFinished
}

function ShutterFromJson(shutter) {
    if(shutter === undefined) {
        throw "Error(Shutter): shutter cannot be undefined";
    }

    return new Shutter(shutter.color, shutter.material, shutter.type, shutter.isFinished);
}

module.exports = {
    Shutter: Shutter,
    ShutterFromJson: ShutterFromJson
};