const routes = require("express").Router();

var OrderService = require("../service/OrderService");
const orderService = new OrderService();
var InvoiceClass = require("../models/Invoice");

routes.get("/getAllOrders", (req, resp) => {
    orderService.getAllOrders((orders) => {
        resp.status(200).send(orders);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/getAllOrdersByUsername", (req, resp) => {
    if(req.body["username"] == undefined) {
        resp.status(400).send("username must be defined");
        return;
    }

    orderService.getAllOrdersByUsername(req.body["username"], (orders) => {
        resp.status(200).send(orders);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/createOrder", (req, resp) => {

    //TODO CHECKS

    //TODO return id

    //TODO create data
    let order = {
        
    };

    orderService.createOrder(order, () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/finishShutter", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).send("orderId must be defined");
        return;
    }
    if(req.body["shutterId"] == undefined) {
        resp.status(400).send("shutterId must be defined");
        return;
    }

    orderService.finishShutter(req.body["orderId"], req.body["shutterId"], () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/createInvoiceForOrder/:orderId", (req, resp) => {
    if(req.params.orderId == undefined) {
        resp.status(400).send("orderId must be defined in the path");
        return;
    }

    let orderId = Number(req.params.orderId)
    if(isNaN(orderId)) {
        resp.status(400).send("orderId must be a number");
        return;
    }

    let invoice;
    try {
        invoice = new InvoiceClass.InvoiceFromJson(req.body["invoice"]);
    } catch (error) {
        resp.status(400).send("" + error);
        return;
    }

    orderService.createInvoiceForOrder(orderId, invoice, () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})


module.exports = {
    routes: routes
}