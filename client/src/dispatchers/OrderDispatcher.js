import { Dispatcher } from 'flux'
import axios from "axios";
import OrderConstants from '../constants/OrderConstants'
import OrderStore from '../stores/OrderStore'
import CostumerDataStore from '../stores/CostumerDataStore'

class OrderDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new OrderDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.CREATE_ORDER){
        return;
    }

    CostumerDataStore._isOwnOrdersFetching = true;
    CostumerDataStore.emitOwnOrdersChange();
    OrderStore._isAllOrdersFetching = true;
    OrderStore.emitAllOrdersChange();

    axios.post("/order/createOrder", {
        "order": data.action.payload.order
    })
    .then((response) => {
        
        let id = response.data.createdId;
        axios.post("/order/getOrderById", {
            "orderId": id
        })
        .then((response) => {
            CostumerDataStore._ownOrders = [...CostumerDataStore._ownOrders, response.data.order];
            OrderStore._allOrders = [...OrderStore._allOrders, response.data.order];
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => {
            CostumerDataStore._isOwnOrdersFetching = false;
            CostumerDataStore.emitOwnOrdersChange();
            OrderStore._isAllOrdersFetching = false;
            OrderStore.emitAllOrdersChange();
            data.action.payload.successCallback();
        })
    })
    .catch((error) => {
        alert(error);
        CostumerDataStore._isOwnOrdersFetching = false;
        CostumerDataStore.emitOwnOrdersChange();
        OrderStore._isAllOrdersFetching = false;
        OrderStore.emitAllOrdersChange();
    })

});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.REFRESH_ALL_ORDERS){
        return;
    }

    OrderStore._isAllOrdersFetching = true;
    OrderStore.emitAllOrdersChange();

    axios.get("/order/getAllOrders")
    .then((response) => {
        OrderStore._allOrders = response.data.orders;
        OrderStore._isAllOrdersFetched = true;
    })
    .catch((error) => {
        alert(error);
    })
    .finally(() => {
        OrderStore._isAllOrdersFetching = false;
        OrderStore.emitAllOrdersChange();
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.FINISH_SHUTTER){
        return;
    }

    CostumerDataStore._isOwnOrdersFetching = true;
    CostumerDataStore.emitOwnOrdersChange();
    OrderStore._isAllOrdersFetching = true;
    OrderStore.emitAllOrdersChange();

    axios.post("/order/finishShutter", {
        "orderId": data.action.payload.orderId,
        "shutterId": data.action.payload.shutterId
    })
    .then((response) => {
        let allOrders = [...OrderStore._allOrders];
        allOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
                order.windows.forEach((window) => {
                    if(window.shutter.id === data.action.payload.shutterId) {
                        window.shutter.isFinished = true;
                    }
                })
            }
        })

        OrderStore._allOrders = allOrders;

        let ownOrders = [...CostumerDataStore._ownOrders];
        ownOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
                order.windows.forEach((window) => {
                    if(window.shutter.id === data.action.payload.shutterId) {
                        window.shutter.isFinished = true;
                    }
                })
            }
        })

        CostumerDataStore._ownOrders = ownOrders;
    })
    .catch((error) => {
        alert(error);
    })
    .finally(() => {
        CostumerDataStore._isOwnOrdersFetching = false;
        CostumerDataStore.emitOwnOrdersChange();
        OrderStore._isAllOrdersFetching = false;
        OrderStore.emitAllOrdersChange();
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.FINISH_INSTALLATION){
        return;
    }

    CostumerDataStore._isOwnOrdersFetching = true;
    CostumerDataStore.emitOwnOrdersChange();
    OrderStore._isAllOrdersFetching = true;
    OrderStore.emitAllOrdersChange();

    axios.post("/order/finishInstallation", {
        "orderId": data.action.payload
    })
    .then((response) => {
        let allOrders = [...OrderStore._allOrders];
        allOrders.forEach((order) => {
            if(order._id === data.action.payload) {
                order.isInstalled = true;
            }
        })

        OrderStore._allOrders = allOrders;

        let ownOrders = [...CostumerDataStore._ownOrders];
        ownOrders.forEach((order) => {
            if(order._id === data.action.payload) {
                order.isInstalled = true;
            }
        })

        CostumerDataStore._ownOrders = ownOrders;
    })
    .catch((error) => {
        alert(error);
    })
    .finally(() => {
        CostumerDataStore._isOwnOrdersFetching = false;
        CostumerDataStore.emitOwnOrdersChange();
        OrderStore._isAllOrdersFetching = false;
        OrderStore.emitAllOrdersChange();
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.CREATE_INVOICE_FOR_ORDER){
        return;
    }

    CostumerDataStore._isOwnOrdersFetching = true;
    CostumerDataStore.emitOwnOrdersChange();
    OrderStore._isAllOrdersFetching = true;
    OrderStore.emitAllOrdersChange();

    axios.post("/order/createInvoiceForOrder", {
        "orderId": data.action.payload.orderId,
        "invoice": data.action.payload.invoice
    })
    .then((response) => {
        let allOrders = [...OrderStore._allOrders];
        allOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
                order.invoice = data.action.payload.invoice;
            }
        })

        OrderStore._allOrders = allOrders;

        let ownOrders = [...CostumerDataStore._ownOrders];
        ownOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
                order.invoice = data.action.payload.invoice;
            }
        })

        CostumerDataStore._ownOrders = ownOrders;
    })
    .catch((error) => {
        alert(error);
    })
    .finally(() => {
        CostumerDataStore._isOwnOrdersFetching = false;
        CostumerDataStore.emitOwnOrdersChange();
        OrderStore._isAllOrdersFetching = false;
        OrderStore.emitAllOrdersChange();
    })
});

export default dispatcher;
