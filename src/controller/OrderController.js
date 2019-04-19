const routes = require("express").Router();

var OrderService = require("../service/OrderService");
const orderService = new OrderService();

routes.get("/getAllOrders", (req, resp) => {
    orderService.getAllOrders((orders) => {
        resp.status(200).send(orders);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.get("/getAllOrdersByUsername/:username", (req, resp) => {
    if(req.params.username == undefined) {
        resp.status(400).send("username must be defined");
        return;
    }

    orderService.getAllOrdersByUsername(req.params.username, (orders) => {
        resp.status(200).send(orders);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/createOrder", (req, resp) => {

    //TODO CHECKS

    //TODO create data
    let order = {
        
    };

    orderService.createOrder(order, () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/finishShutter/", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).send("orderId must be defined");
        return;
    }
    if(req.body["shutterId"] == undefined) {
        resp.status(400).send("shutterId must be defined");
        return;
    }

    orderService.finishOrder(req.body["orderId"], req.body["shutterId"], () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.post("/createInvoiceForOrder/:orderId", (req, resp) => {
    if(req.params.orderId == undefined) {
        resp.status(400).send("orderId must be defined");
        return;
    }

    if(req.body["invoice"] == undefined) {
        resp.status(400).send("invoice must be defined");
        return;
    }

    orderService.createInvoiceForOrder(req.params.orderId, req.body["invoice"], () => {
        resp.status(200).send();
    }, (error) => {
        resp.status(400).send(error);
    });
})


module.exports = {
    routes: routes
}