const routes = require("express").Router();

var InvoiceClass = require("../models/Invoice");
var OrderClass = require("../models/Order");

var OrderService = require("../service/OrderService");
const orderService = new OrderService();

const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

routes.get("/getAllOrders", (req, resp) => {
    orderService.getAllOrders((orders) => {
        resp.status(200).send({"orders": orders});
    }, (error) => {
        resp.status(400).send({"error": error});
    });
})

routes.post("/getAllOrdersByUsername", (req, resp) => {
    if(req.body["username"] == undefined) {
        resp.status(400).send({"error": "username must be defined"});
        return;
    }

    orderService.getAllOrdersByUsername(req.body["username"], (orders) => {
        resp.status(200).send({"orders": orders});
    }, (error) => {
        resp.status(400).send({"error": error});
    });
})

routes.post("/getOrderById", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).send({"error": "orderId must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.getOrderById(req.body["orderId"], (order) => {
        resp.status(200).send({"order": order});
    }, (error) => {
        resp.status(400).send({"error": error});
    });
})

routes.post("/createOrder", (req, resp) => {
    let order;
    try {
        order = new OrderClass.OrderFromJson(req.body["order"]);
    } catch (error) {
        resp.status(400).send({"error": error});
        return;
    }

    orderService.createOrder(order, (createdId) => {
        resp.status(200).send({"createdId": createdId});
    }, (error) => {
        resp.status(400).send({"error": error});
    });
})

routes.post("/finishShutter", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).send({"error": "orderId must be defined"});
        return;
    }
    if(req.body["shutterId"] == undefined) {
        resp.status(400).send({"error": "shutterId must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.finishShutter(req.body["orderId"], req.body["shutterId"], () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send({"error": error});
    });
})

routes.post("/createInvoiceForOrder", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).send({"error": "orderId must be defined"});
        return;
    }

    let invoice;
    try {
        invoice = new InvoiceClass.InvoiceFromJson(req.body["invoice"]);
    } catch (error) {
        resp.status(400).send({"error": error});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.createInvoiceForOrder(req.body["orderId"], invoice, () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(500).send({"error": error});
    });
})

module.exports = {
    routes: routes
}