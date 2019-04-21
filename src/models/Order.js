var InvoiceClass = require("./Invoice");
var CustomerDataClass = require("./CustomerData");
var WindowClass = require("./Window");

function Order(comment, isInstalled, customerData, invoice, windows) {
    if(comment === undefined) {
        throw "Error(Order): comment cannot be undefined";
    }
    if(customerData === undefined) {
        throw "Error(Order): customerData cannot be undefined";
    }
    if(windows === undefined) {
        throw "Error(Order): windows cannot be undefined";
    }
    if(isInstalled === undefined) {
        throw "Error(Order): isInstalled cannot be undefined";
    }

    if(typeof comment !== 'string') {
        throw "Error(Order): comment must be a string";
    }
    if(typeof isInstalled !== 'boolean') {
        throw "Error(Order): isInstalled must be a boolean";
    }

    if(!Array.isArray(windows)) {
        throw "Error(Order): windows must be an array";
    }

    if(windows.length <= 0) {
        throw "Error(Order): windows size must be at least 1";
    }

    for (let i = 0; i < windows.length; i++) {
        windows[i] = new WindowClass.WindowFromJson(windows[i]); 
    }

    this.comment = comment;
    this.customerData = new CustomerDataClass.CustomerDataFromJson(customerData);
    if(invoice !== undefined) {
        this.invoice = new InvoiceClass.InvoiceFromJson(invoice);
    }
    this.isInstalled = isInstalled;
    this.windows = windows;
}

function OrderFromJson(order) {
    if(order === undefined) {
        throw "Error(Order): order cannot be undefined";
    }

    return new Order(order.comment, order.isInstalled, order.customerData, order.invoice, order.windows);
}

module.exports = {
    Order: Order,
    OrderFromJson: OrderFromJson
};