function OrderService() {
    winston = require('winston')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'order-service' },
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
        logger.info("Error in getAllOrders, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.getAllOrdersByUsername = function(username, successCallback, errorCallback){
    this.orderDao.getAllOrdersByUsername(username, (orders) => {
        logger.info(`getAllOrdersByUsername: ${orders.length} orders were found!`)
        successCallback(orders)
    }, (error) => {
        logger.info("Error in getAllOrdersByUsername, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.createOrder = function(order, successCallback, successCallback){
    //TODO generate parts
    this.orderDao.createOrder(order, () => {
        logger.info("createOrder: Order successfully created")
        successCallback()
    }, (error) => {
        logger.info("Error in createOrder, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.finishShutter = function(orderId, shutterId, successCallback, errorCallback){
    this.orderDao.finishShutter(orderId, shutterId, () => {
        logger.info("finishShutter: Order successfully finished")
        successCallback()
    }, (error) => {
        logger.info("Error in finishShutter, cause: " + error)
        errorCallback(error)
    })
}


OrderService.prototype.createInvoiceForOrder = function(orderId, invoice, successCallback, errorCallback){
    this.orderDao.createInvoiceForOrder(orderId, invoice, () => {
        logger.info("createInvoiceForOrder: invoice succesfully created on order")
        successCallback()
    }, (error) => {
        logger.info("Error in createInvoiceForOrder, cause: " + error)
        errorCallback(error)
    })
}

module.exports = OrderService;