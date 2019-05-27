import EventEmitter from 'events'

class CostumerDataStore extends EventEmitter{
    _costumerData = undefined;
    _ownOrders = [];

    _isOwnOrdersFetching = false;

    emitCostumerDataChange() {
        this.emit('costumer-data-change');
    }

    addCostumerDataChangeListener(callback) {
        this.addListener('costumer-data-change', callback);
    }

    removeCostumerDataChangeListener(callback) {
        this.removeListener('costumer-data-change', callback);
    }

    emitOwnOrdersChange(){
        this.emit('own-orders-change');
    }

    addOwnOrdersChangeListener(callback) {
        this.addListener('own-orders-change', callback);
    }

    removeOwnOrdersChangeListener(callback) {
        this.removeListener('own-orders-change', callback);
    }
}

export default new CostumerDataStore();