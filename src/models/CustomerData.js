const emailRegexp = new RegExp('/\S+@\S+\.\S+/','i');

function CostumerData(name, email, address) {
    if(name === undefined) {
        throw "Error(CostumerData): name cannot be undefined";
    }
    if(email === undefined) {
        throw "Error(CostumerData): email cannot be undefined";
    }
    if(address === undefined) {
        throw "Error(CostumerData): address cannot be undefined";
    }

    if(typeof name !== 'string') {
        throw "Error(CostumerData): name must be a string";
    }
    if(typeof email !== 'string') {
        throw "Error(CostumerData): email must be a string";
    }
    if(typeof address !== 'string') {
        throw "Error(CostumerData): address must be a string";
    }

    if(name === "") {
        throw "Error(CostumerData): name cannot be empty string";
    }
    if(email === "") {
        throw "Error(CostumerData): email cannot be empty string";
    }
    if(address === "") {
        throw "Error(CostumerData): address cannot be empty string";
    }

    if(emailRegexp.test(email)) {
        throw "Error(CostumerData): email must be a valid email address";
    }

    this.name =  name;
    this.email =  email;
    this.address = address;
}

module.exports = {
    CostumerData: CostumerData
};