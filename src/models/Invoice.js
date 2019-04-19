function Invoice(price, isPaid) {
    if(price === undefined) {
        throw "Error(Invoice): price cannot be undefined";
    }
    if(isPaid === undefined) {
        throw "Error(Invoice): isPaid cannot be undefined"
    }

    if(typeof price !== 'number') {
        throw "Error(Invoice): price must be a number";
    }
    if(typeof isPaid !== 'boolean') {
        throw "Error(Invoice): isPaid must be a boolean";
    }

    if(price < 0) {
        throw "Error(Invoice): price must be a non-negative number";
    }

	this.price = price;
	this.isPaid = isPaid;
}

module.exports = {
    Invoice: Invoice
};