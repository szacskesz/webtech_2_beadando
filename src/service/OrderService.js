function OrderService() {
    winston = require('winston')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' })
        ]
    });
    this.orderDao = require('../dao/OrderDao');
}

OrderService.prototype.getAllOrders = function(successCallback, errorCallback){
    this.orderDao.getAllOrders((orders) => {
        logger.info(`getAllOrders: ${orders.length} orders were found!`)
        successCallback(orders)
    }, (error) => {
        logger.error("Error in getAllOrders, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.getOrderById = function(orderId, successCallback, errorCallback){
    this.orderDao.getOrderById(orderId, (order) => {
        logger.info("getOrderById: order was found!")
        successCallback(order)
    }, (error) => {
        logger.error("Error in getOrderById, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.getAllOrdersByEmail = function(email, successCallback, errorCallback){
    this.orderDao.getAllOrdersByEmail(email, (orders) => {
        logger.info(`getAllOrdersByEmail: ${orders.length} orders were found!`)
        successCallback(orders)
    }, (error) => {
        logger.error("Error in getAllOrdersByEmail, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.createOrder = function(order, successCallback, errorCallback){
    for (let i = 0; i < order.windows.length; i++) {
        order.windows[i].shutter.parts = [
            {
                count: Math.ceil(order.windows[i].width / 30),
                description: `${order.windows[i].width}mm wide, ${order.windows[i].shutter.color} ${order.windows[i].shutter.material} rod`
            },
            {
                count: 2,
                description: "Rope"
            }
        ]

        if( order.windows[i].shutter.type === "with bug-screen") {
            order.windows[i].shutter.parts.push({
                count: 1,
                description: "Bug-screen"
            })
        }
    }

    this.orderDao.createOrder(order, (createdId) => {
        logger.info("createOrder: Order successfully created")
        successCallback(createdId)
    }, (error) => {
        logger.error("Error in createOrder, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.finishShutter = function(orderId, shutterId, successCallback, errorCallback){
    this.orderDao.finishShutter(orderId, shutterId, () => {
        logger.info("finishShutter: Shutter successfully finished")
        successCallback()
    }, (error) => {
        logger.error("Error in finishShutter, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.createInvoiceForOrder = function(orderId, invoice, successCallback, errorCallback){
    this.orderDao.createInvoiceForOrder(orderId, invoice, () => {
        logger.info("createInvoiceForOrder: invoice succesfully created on order")
        successCallback()
    }, (error) => {
        logger.error("Error in createInvoiceForOrder, cause: " + error)
        errorCallback(error)
    })
}

module.exports = OrderService;