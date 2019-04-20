const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+','i');

function CustomerData(name, email, address) {
    if(name === undefined) {
        throw "Error(CustomerData): name cannot be undefined";
    }
    if(email === undefined) {
        throw "Error(CustomerData): email cannot be undefined";
    }
    if(address === undefined) {
        throw "Error(CustomerData): address cannot be undefined";
    }

    if(typeof name !== 'string') {
        throw "Error(CustomerData): name must be a string";
    }
    if(typeof email !== 'string') {
        throw "Error(CustomerData): email must be a string";
    }
    if(typeof address !== 'string') {
        throw "Error(CustomerData): address must be a string";
    }

    if(name === "") {
        throw "Error(CustomerData): name cannot be empty string";
    }
    if(email === "") {
        throw "Error(CustomerData): email cannot be empty string";
    }
    if(address === "") {
        throw "Error(CustomerData): address cannot be empty string";
    }

    if(!emailRegexp.test(email)) {
        throw "Error(CustomerData): email must be a valid email address";
    }

    this.name =  name;
    this.email =  email;
    this.address = address;
}

function CustomerDataFromJson(customerData) {
    if(customerData === undefined) {
        throw "Error(CustomerData): customerData cannot be undefined";
    }

    return new CustomerData(customerData.name, customerData.email, customerData.address);
}

module.exports = {
    CustomerData: CustomerData,
    CustomerDataFromJson: CustomerDataFromJson
};