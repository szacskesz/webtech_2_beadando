var counter = (function(){
    var cnt = 0;
    return function(){
        cnt++;
        return cnt;
    }
})();

function Order(comment, customerData, invoice, windows) {

    if(comment === undefined) {
        throw "Error(Order): comment cannot be undefined";
    }
    if(customerData === undefined) {
        throw "Error(Order): customerData cannot be undefined";
    }
    if(windows === undefined) {
        throw "Error(Order): windows cannot be undefined";
    }

    if(typeof comment !== 'string') {
        throw "Error(Order): comment must be a string";
    }
    //TODO
    // if(typeof customerData !== 'string') {
    //     throw "Error(Order): material must be string";
    // }
    //TODO 
    // if(invoice !== undefined && typeof invoice !== 'string') {
    //     throw "Error(Order): type must be string";
    // }

    if(windows.length <= 0) {
        throw "Error(Order): windows size must be at least 1";
    }

    this.id = counter();
    this.comment = comment; //can be empty string
    this.customerData = customerData; //must
    this.invoice = invoice; //can be undefined
    this.windows = windows; //must be at least 1
}

module.exports = {
    Order: Order
};