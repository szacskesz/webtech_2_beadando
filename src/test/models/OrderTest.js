const assert = require('assert');
const OrderClass = require('../../models/Order');
const CustomerDataClass = require('../../models/CustomerData');
const InvoiceClass = require('../../models/Invoice');
const WindowClass = require('../../models/Window');

describe('Order class tests', () => {
    it('test OrderFromJson with undefined', () => {
        try {
            let order = new OrderClass.OrderFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): order cannot be undefined")
        }
    })

    it('test Order with undefined comment', () => {
        try {
            let comment = undefined;
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = [];
            windows.push( new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            }));
            windows.push( new WindowClass.WindowFromJson({
                width: 10,
                height: 40,
                shutter:  {
                    color: "black",
                    material: "metal",
                    type: "not-basic",
                    isFinished: true
                }
            }));

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): comment cannot be undefined")
        }
    })

    it('test Order with undefined customerData', () => {
        try {
            let comment = "comment...";
            let customerData = undefined;
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = [];
            windows.push( new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            }));
            windows.push( new WindowClass.WindowFromJson({
                width: 10,
                height: 40,
                shutter:  {
                    color: "black",
                    material: "metal",
                    type: "not-basic",
                    isFinished: true
                }
            }));

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): customerData cannot be undefined")
        }
    })

    it('test Order with undefined windows', () => {
        try {
            let comment = "comment...";
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = undefined;

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): windows cannot be undefined")
        }
    })

    it('test Order with integer comment', () => {
        try {
            let comment = 1;
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = [];
            windows.push( new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            }));
            windows.push( new WindowClass.WindowFromJson({
                width: 10,
                height: 40,
                shutter:  {
                    color: "black",
                    material: "metal",
                    type: "not-basic",
                    isFinished: true
                }
            }));

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): comment must be a string")
        }
    })

    it('test Order with object windows', () => {
        try {
            let comment = "comment...";
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            });

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): windows must be an array")
        }
    })

    it('test Order with empty windows array', () => {
        try {
            let comment = "comment...";
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = [];

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): windows size must be at least 1")
        }
    })

    it('test Order with normal inputs', () => {
        try {
            let comment = "comment...";
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = new InvoiceClass.Invoice(100, false);
            let windows = [];
            windows.push( new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            }));
            windows.push( new WindowClass.WindowFromJson({
                width: 10,
                height: 40,
                shutter:  {
                    color: "black",
                    material: "metal",
                    type: "not-basic",
                    isFinished: true
                }
            }));

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
        } catch (error) {
            assert.fail();
        }
    })

    it('test Order with normal inputs v2', () => {
        try {
            let comment = "comment...";
            let customerData = new CustomerDataClass.CustomerData("tester tester", "test@test.hu", "3555 Testland");
            let invoice = undefined;
            let windows = [];
            windows.push( new WindowClass.WindowFromJson({
                width: 100,
                height: 300,
                shutter:  {
                    color: "white",
                    material: "wood",
                    type: "basic",
                    isFinished: false
                }
            }));

            let order = new OrderClass.Order(comment, customerData, invoice, windows);
        } catch (error) {
            assert.fail();
        }
    })
})