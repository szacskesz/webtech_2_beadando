const routes = require("express").Router();

var InvoiceClass = require("../models/Invoice");
var OrderClass = require("../models/Order");

var OrderService = require("../service/OrderService");
const orderService = new OrderService();

const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+','i');

routes.get("/getAllOrders", (req, resp) => {
    orderService.getAllOrders((orders) => {
        resp.status(200).contentType("application/json").send({"orders": orders});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})

routes.post("/getAllOrdersByEmail", (req, resp) => {
    if(req.body["email"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "email must be defined"});
        return;
    }

    if(!emailRegexp.test(req.body["email"])) {
        resp.status(400).contentType("application/json").send({"error": "email must be a valid email address"});
        return;
    }

    orderService.getAllOrdersByEmail(req.body["email"], (orders) => {
        resp.status(200).contentType("application/json").send({"orders": orders});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})

routes.post("/getOrderById", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.getOrderById(req.body["orderId"], (order) => {
        resp.status(200).contentType("application/json").send({"order": order});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})

routes.post("/createOrder", (req, resp) => {
    let order;
    try {
        order = new OrderClass.OrderFromJson(req.body["order"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    orderService.createOrder(order, (createdId) => {
        resp.status(200).contentType("application/json").send({"createdId": createdId});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})


routes.post("/finishInstallation", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.finishInstallation(req.body["orderId"], () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})

routes.post("/finishShutter", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be defined"});
        return;
    }
    if(req.body["shutterId"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "shutterId must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.finishShutter(req.body["orderId"], req.body["shutterId"], () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
})

routes.post("/createInvoiceForOrder", (req, resp) => {
    if(req.body["orderId"] == undefined) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be defined"});
        return;
    }

    let invoice;
    try {
        invoice = new InvoiceClass.InvoiceFromJson(req.body["invoice"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderId"])) {
        resp.status(400).contentType("application/json").send({"error": "orderId must be 24 hex string"});
        return;
    }

    orderService.createInvoiceForOrder(req.body["orderId"], invoice, () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(500).contentType("application/json").send({"error": error});
    });
})

module.exports = {
    routes: routes
}