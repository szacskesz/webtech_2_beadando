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

    this.color =  color; //get all (piros zöld kék, sárga, )
    this.material = material; //get all materials (fa, műanyag, acél)
    this.type = type; //get all types (egyszerű, szúnyoghálós)
    this.isFinished = isFinished
}

module.exports = {
    Shutter: Shutter
};