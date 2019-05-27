import EventEmitter from 'events'

class ShutterDataStore extends EventEmitter {
    _shutterColors = [];
    _shutterTypes = [];
    _shutterMaterials = [];

    _isShutterColorsFetching = false;
    _isShutterTypesFetching = false;
    _isShutterMaterialsFetching = false;

    emitShutterColorsChange() {
        this.emit('shutter-colors-change');
    }

    addShutterColorsChangeListener(callback) {
        this.addListener('shutter-colors-change', callback);
    }
    
    removeShutterColorsChangeListener(callback) {
        this.removeListener('shutter-colors-change', callback);
    }
    
    emitShutterTypesChange() {
        this.emit('shutter-types-change');
    }

    addShutterTypesChangeListener(callback) {
        this.addListener('shutter-types-change', callback);
    }
    
    removeShutterTypessChangeListener(callback) {
        this.removeListener('shutter-types-change', callback);
    }

    emitShutterMaterialsChange() {
        this.emit('shutter-materials-change');
    }
    
    addShutterMaterialsChangeListener(callback) {
        this.addListener('shutter-materials-change', callback);
    }
    
    removeShutterMaterialsChangeListener(callback) {
        this.removeListener('shutter-materials-change', callback);
    }
}

export default new ShutterDataStore();