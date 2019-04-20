const assert = require('assert');
const InvoiceClass = require('../../models/Invoice');

describe('Invoice class tests', () => {
    it('test InvoiceFromJson with undefined', () => {
        try {
            let invoice = new InvoiceClass.InvoiceFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): invoice cannot be undefined")
        }
    })

    it('test Invoice with undefined price', () => {
        try {
            let price = undefined;
            let isPaid = false;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): price cannot be undefined")
        }
    })

    it('test Invoice with undefined isPaid', () => {
        try {
            let price = 100;
            let isPaid = undefined;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): isPaid cannot be undefined")
        }
    })

    it('test Invoice with string price', () => {
        try {
            let price = "100";
            let isPaid = false;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): price must be a number")
        }
    })

    it('test Invoice with string isPaid', () => {
        try {
            let price = 100;
            let isPaid = "false";
            let invoice = new InvoiceClass.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): isPaid must be a boolean")
        }
    })

    it('test Invoice with negative price', () => {
        try {
            let price = -100;
            let isPaid = false;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): price must be a non-negative number")
        }
    })

    it('test Invoice with zero price', () => {
        try {
            let price = 0;
            let isPaid = false;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
        } catch (error) {
            assert.fail();
        }
    })

    it('test Invoice with normal inputs', () => {
        try {
            let price = 100;
            let isPaid = false;
            let invoice = new InvoiceClass.Invoice(price, isPaid);
        } catch (error) {
            assert.fail();
        }
    })
})