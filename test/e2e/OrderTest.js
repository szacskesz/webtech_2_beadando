const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const OrderClass = require("../../models/Order");
const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

chai.use(chaiHttp);
var assert = require('chai').assert

describe("Order e2e tests", () => {
    let initialCount = 0;

    let createdEmail = "B@B.B";
    let createdId = undefined;
    let createdShutterId = undefined;

    let json = {
        order: {
            comment: "no..",
            isInstalled: false,
            customerData: {
                name: "A" ,
                email: createdEmail,
                address: "C"
            },
            windows: [{
                width: 1,
                height: 2,
                shutter: {
                    color: "white",
                    material: "wood",
                    type: "with bug-screen",
                    isFinished: false
                }
            }]
        }
    };

    step("should get all orders", (done) => {
        chai.request(app)
            .get('/order/getAllOrders')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.orders, 'array');

                for (let i = 0; i < res.body.orders.length; i++) {
                    try {
                        let order = new OrderClass.OrderFromJson(res.body.orders[i]);
                    } catch (error) {
                        assert.fail();
                    }
                }
                initialCount = res.body.orders.length;
                
                done();
            });
    });

    step("should create order", (done) => {
        chai.request(app)
            .post('/order/createOrder')
            .send(json)
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.createdId, 'string');
                assert.match(res.body.createdId, checkForHexRegExp);

                createdId = res.body.createdId;

                done();
            });
    });
    
    step("should all orders be more than pervious", (done) => {
        chai.request(app)
            .get('/order/getAllOrders')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.orders, 'array');
                assert.isAbove(res.body.orders.length, initialCount);

                for (let i = 0; i < res.body.orders.length; i++) {
                    try {
                        let order = new OrderClass.OrderFromJson(res.body.orders[i]);
                    } catch (error) {
                        assert.fail();
                    }
                }
                
                done();
            });
    });

    step("should get all orders by email", (done) => {
        chai.request(app)
            .post('/order/getAllOrdersByEmail')
            .send({"email": createdEmail})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.orders, 'array');
                assert.isAbove(res.body.orders.length, 0);

                for (let i = 0; i < res.body.orders.length; i++) {
                    try {
                        let order = new OrderClass.OrderFromJson(res.body.orders[i]);
                    } catch (error) {
                        assert.fail();
                    }
                }
                
                done();
            });
    });

    step("should fail get all orders by email", (done) => {
        chai.request(app)
            .post('/order/getAllOrdersByEmail')
            .send({"email": undefined})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail get all orders by email v2", (done) => {
        chai.request(app)
            .post('/order/getAllOrdersByEmail')
            .send({"email": "asd"})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail get all orders by email v3", (done) => {
        chai.request(app)
            .post('/order/getAllOrdersByEmail')
            .send({"email": "asd@."})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should get order by id", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": createdId})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.order, 'object');
                assert.equal(res.body.order.isInstalled, false);
                assert.typeOf(res.body.order.windows, 'array');
                assert.isAbove(res.body.order.windows.length, 0);
                assert.notExists(res.body.order.invoice);
                for (let i = 0; i < res.body.order.windows.length; i++) {
                    assert.typeOf(res.body.order.windows[i].shutter, 'object');
                    assert.exists(res.body.order.windows[i].shutter.id);
                    createdShutterId = res.body.order.windows[i].shutter.id;
                    assert.equal(res.body.order.windows[i].shutter.isFinished, false);
                    assert.typeOf(res.body.order.windows[i].shutter.parts, 'array');
                    assert.isAbove(res.body.order.windows[i].shutter.parts.length, 0);
                }

                try {
                    let order = new OrderClass.OrderFromJson(res.body.order);
                } catch (error) {
                    assert.fail();
                }
                
                done();
            });
    });

    step("should fail get order by id", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": "asdasd"})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail get order by id v2", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": undefined})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail finishShutter", (done) => {
        chai.request(app)
            .post('/order/finishShutter')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail finishShutter v2", (done) => {
        chai.request(app)
            .post('/order/finishShutter')
            .send({
                "orderId": -1,
                "shutterId": -1
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail finishShutter v3", (done) => {
        chai.request(app)
            .post('/order/finishShutter')
            .send({
                "orderId": undefined,
                "shutterId": undefined
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("sould succeed finishShutter", (done) => {
        chai.request(app)
            .post('/order/finishShutter')
            .send({
                "orderId": createdId,
                "shutterId": createdShutterId
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                
                done();
            });
    });

    step("should have finished shutter", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": createdId})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.order, 'object');
                assert.typeOf(res.body.order.windows, 'array');
                assert.isAbove(res.body.order.windows.length, 0);
                assert.notExists(res.body.order.invoice);
                for (let i = 0; i < res.body.order.windows.length; i++) {
                    assert.typeOf(res.body.order.windows[i].shutter, 'object');
                    assert.exists(res.body.order.windows[i].shutter.id);
                    createdShutterId = res.body.order.windows[i].shutter.id;
                    assert.typeOf(res.body.order.windows[i].shutter.parts, 'array');
                    assert.isAbove(res.body.order.windows[i].shutter.parts.length, 0);
                    if(res.body.order.windows[i].shutter.id === createdShutterId) {
                        assert.equal(res.body.order.windows[i].shutter.isFinished, true)
                    } else {
                        assert.equal(res.body.order.windows[i].shutter.isFinished, false);
                    }
                }

                try {
                    let order = new OrderClass.OrderFromJson(res.body.order);
                } catch (error) {
                    assert.fail();
                }
                
                done();
            });
    });

    step("should fail createInvoiceForOrder", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail createInvoiceForOrder v2", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({
                "orderId": undefined,
                "invoice": undefined
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail createInvoiceForOrder v3", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({
                "orderId": "aa-1",
                "invoice": "undefined"
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail createInvoiceForOrder v4", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({
                "orderId": createdId,
                "invoice": "undefined"
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });
    
    step("should fail createInvoiceForOrder v5", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({
                "orderId": "createdId",
                "invoice": {
                    "price": 1,
                    "isPaid": false
                }
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should succeed createInvoiceForOrder", (done) => {
        chai.request(app)
            .post('/order/createInvoiceForOrder')
            .send({
                "orderId": createdId,
                "invoice": {
                    "price": 1,
                    "isPaid": false
                }
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                
                done();
            });
    });

    step("should have invoice on order", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": createdId})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.order, 'object');
                assert.typeOf(res.body.order.windows, 'array');
                assert.isAbove(res.body.order.windows.length, 0);
                assert.typeOf(res.body.order.invoice, 'object');
                assert.equal(res.body.order.invoice.price, 1);
                assert.equal(res.body.order.invoice.isPaid, false);

                try {
                    let order = new OrderClass.OrderFromJson(res.body.order);
                } catch (error) {
                    assert.fail();
                }
                
                done();
            });
    });

    step("should fail finishInstallation", (done) => {
        chai.request(app)
            .post('/order/finishInstallation')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail finishInstallation v2", (done) => {
        chai.request(app)
            .post('/order/finishInstallation')
            .send({"orderId": undefined})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should fail finishInstallation v3", (done) => {
        chai.request(app)
            .post('/order/finishInstallation')
            .send({"orderId": -1})
            .end((err, res) => {
                assert.equal(res.status, 400);
                
                done();
            });
    });

    step("should succeed finishInstallation", (done) => {
        chai.request(app)
            .post('/order/finishInstallation')
            .send({"orderId": createdId})
            .end((err, res) => {
                assert.equal(res.status, 200);
                
                done();
            });
    });

    step("should have installed true on order", (done) => {
        chai.request(app)
            .post('/order/getOrderById')
            .send({"orderId": createdId})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body, 'object');
                assert.typeOf(res.body.order, 'object');
                assert.equal(res.body.order.isInstalled, true);
                assert.typeOf(res.body.order.windows, 'array');
                assert.isAbove(res.body.order.windows.length, 0);
                assert.exists(res.body.order.invoice);
                for (let i = 0; i < res.body.order.windows.length; i++) {
                    assert.typeOf(res.body.order.windows[i].shutter, 'object');
                    assert.exists(res.body.order.windows[i].shutter.id);
                    createdShutterId = res.body.order.windows[i].shutter.id;
                    if(res.body.order.windows[i].shutter.id === createdShutterId) {
                        assert.equal(res.body.order.windows[i].shutter.isFinished, true)
                    } else {
                        assert.equal(res.body.order.windows[i].shutter.isFinished, false);
                    }
                    assert.typeOf(res.body.order.windows[i].shutter.parts, 'array');
                    assert.isAbove(res.body.order.windows[i].shutter.parts.length, 0);
                }

                try {
                    let order = new OrderClass.OrderFromJson(res.body.order);
                } catch (error) {
                    assert.fail();
                }
                
                done();
            });
    });
    
});