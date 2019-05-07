import EventEmitter from 'events'

class ShutterDataStore extends EventEmitter{
    _shutterData = {
        colors: [],
        types: [],
        materials: []
    }


    emitChange(){
        this.emit('shutter-data-change');
    }

    addChangeListener(callback) {
        this.addListener('shutter-data-change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('shutter-data-change', callback);
    }
}

export default new ShutterDataStore();