import OrderConstants from '../constants/OrderConstants'
import OrderDispatcher from '../dispatchers/OrderDispatcher'

class OrderActions {

    createOrder(order) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.CREATE_ORDER,
            payload : order
        })
    }

    refreshAllOrders() {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.REFRESH_ALL_ORDERS
        })
    }

    finishShutter(orderId, shutterId) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.FINISH_SHUTTER,
            payload : {
                orderId : orderId,
                shutterId: shutterId
            }
        })
    }

    finishInstallation(orderId) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.FINISH_INSTALLATION,
            payload : orderId
        })
    }

    createInvoiceForOrder(orderId, invoice) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.CREATE_INVOICE_FOR_ORDER,
            payload : {
                orderId: orderId,
                invoice: invoice
            }
        })
    }
}

export default new OrderActions();