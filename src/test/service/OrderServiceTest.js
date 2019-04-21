const assert = require('assert');
const OrderService = require('../../service/OrderService');

describe('OrderService tests', () => {
    it('test OrderService can be constructed', () => {
        const orderService = new OrderService();

        if(orderService !== undefined && orderService !== null) {
            assert.ok(true);
        } else{
            assert.ok(false);
        }
    })

    it('test OrderService getAllOrders with success', () => {
        const dao = {
            getAllOrders : function(successC, errorC){
                successC(["1","2"]);
            }
        }
        const orderService = new OrderService(dao);

        orderService.getAllOrders(
            (resp) => {
                assert.deepEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService getAllOrders with error', () => {
        const dao = {
            getAllOrders : function(successC, errorC){
                errorC("error");
            }
        }
        const orderService = new OrderService(dao);

        orderService.getAllOrders(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    })

    it('test OrderService getOrderById with success', () => {
        const dao = {
            getOrderById : function(orderId, successC, errorC){
                successC(orderId);
            }
        }
        const orderService = new OrderService(dao);

        orderService.getOrderById(
            1,
            (resp) => {
                assert.deepEqual(resp, 1);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService getOrderById with error', () => {
        const dao = {
            getOrderById : function(orderId, successC, errorC){
                errorC(orderId);
            }
        }
        const orderService = new OrderService(dao);

        orderService.getOrderById(
            1,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepEqual(error, 1);
            }
        );
    })

    it('test OrderService getAllOrdersByEmail with success', () => {
        const dao = {
            getAllOrdersByEmail : function(email, successC, errorC){
                successC(email);
            }
        }
        const orderService = new OrderService(dao);

        orderService.getAllOrdersByEmail(
            "a@a.hu",
            (resp) => {
                assert.deepEqual(resp, "a@a.hu");
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService getAllOrdersByEmail with error', () => {
        const dao = {
            getAllOrdersByEmail : function(email, successC, errorC){
                errorC(email);
            }
        }
        const orderService = new OrderService(dao);

        orderService.getAllOrdersByEmail(
            "a@a.hu",
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepEqual(error, "a@a.hu");
            }
        );
    })

    it('test OrderService finishShutter with success', () => {
        const dao = {
            finishShutter : function(orderId, shutterId, successC, errorC){
                successC();
            }
        }
        const orderService = new OrderService(dao);

        orderService.finishShutter(
            1,
            2,
            (resp) => {
                assert.ok(true);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService finishShutter with error', () => {
        const dao = {
            finishShutter : function(orderId, shutterId, successC, errorC){
                errorC( "" + orderId + " " + shutterId );
            }
        }
        const orderService = new OrderService(dao);

        orderService.finishShutter(
            1,
            2,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepEqual(error, "1 2");
            }
        );
    })

    it('test OrderService createInvoiceForOrder with success', () => {
        const dao = {
            createInvoiceForOrder : function(orderId, invoice, successC, errorC){
                successC();
            }
        }
        const orderService = new OrderService(dao);

        orderService.createInvoiceForOrder(
            1,
            "invoice",
            (resp) => {
                assert.ok(true);
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService createInvoiceForOrder with error', () => {
        const dao = {
            createInvoiceForOrder : function(orderId, invoice, successC, errorC){
                errorC( "" + orderId + " " + invoice );
            }
        }
        const orderService = new OrderService(dao);

        orderService.createInvoiceForOrder(
            1,
            "invoice",
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepEqual(error, "1 invoice");
            }
        );
    })

    it('test OrderService createOrder parts rods count', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "299",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: true
                    }
                }
            ]
        }

        const dao = {
            createOrder : function(order, successC, errorC) {
                try{
                    assert.deepEqual(order.windows[0].shutter.parts[0].count, 10);
                } catch {
                    assert.fail();
                }
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {},
            (error) => {}
        );
    })

    it('test OrderService createOrder parts ropes count', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "299",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: true
                    }
                }
            ]
        }

        const dao = {
            createOrder : function(order, successC, errorC) {
                try{
                    assert.deepEqual(order.windows[0].shutter.parts[1].count, 2);
                } catch {
                    assert.fail();
                }
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {},
            (error) => {}
        );
    })

    it('test OrderService createOrder parts rods description', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "299",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: true
                    }
                }
            ]
        }

        const dao = {
            createOrder : function(order, successC, errorC) {
                try{
                    assert.deepEqual(order.windows[0].shutter.parts[0].description,
                        "200mm wide, white plastic rod");
                } catch {
                    assert.fail();
                }
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {},
            (error) => {}
        );
    })

    it('test OrderService createOrder parts ropes description', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "299",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: true
                    }
                }
            ]
        }

        const dao = {
            createOrder : function(order, successC, errorC) {
                try{
                    assert.deepEqual(order.windows[0].shutter.parts[1].description, "Rope");
                } catch {
                    assert.fail();
                }
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {},
            (error) => {}
        );
    })

    it('test OrderService createOrder parts with bugs-screen', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "299",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "with bug-screen",
                        isFinished: true
                    }
                }
            ]
        }

        const dao = {
            createOrder : function(order, successC, errorC) {
                try{
                    assert.deepEqual(order.windows[0].shutter.parts.length, 3);
                    assert.deepEqual(order.windows[0].shutter.parts[2].count, 1)
                    assert.deepEqual(order.windows[0].shutter.parts[2].description, "Bug-screen")
                } catch {
                    assert.fail();
                }
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {},
            (error) => {}
        );
    })

    it('test OrderService createOrder with success', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "300",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: false
                    }
                }
            ]
        }
        const dao = {
            createOrder : function(order, successC, errorC){
                successC("id1");
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {
                assert.deepEqual(resp, "id1");
            },
            (error) => {
                assert.fail(error);
            }
        );
    })

    it('test OrderService createOrder with error', () => {
        const mockOrder = {
            customerData: {
                name: "Kis Pál",
                email: "kispal@mail.com",
                address: "3525 Msikolc Hősök tere 1."
            },
            comment: "No comment",
            windows: [
                {
                    width: "200",
                    height: "300",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        type: "basic",
                        isFinished: true
                    }
                }
            ]
        }
        const dao = {
            createOrder : function(order, successC, errorC){
                errorC( "error" );
            }
        }
        const orderService = new OrderService(dao);

        orderService.createOrder(
            mockOrder,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepEqual(error, "error");
            }
        );
    })
})