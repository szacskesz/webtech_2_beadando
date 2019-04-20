const assert = require('assert');
const CustomerDataClass = require('../../models/CustomerData');

describe('CustomerData class tests', () => {
    it('test CustomerDataFromJson with undefined', () => {
        try {
            let customerData = new CustomerDataClass.CustomerDataFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): customerData cannot be undefined")
        }
    })

    it('test CustomerData with undefined name', () => {
        try {
            let name = undefined;
            let email = "test@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): name cannot be undefined")
        }
    })

    it('test CustomerData with undefined email', () => {
        try {
            let name = "tester tester";
            let email = undefined;
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email cannot be undefined")
        }
    })

    it('test CustomerData with undefined address', () => {
        try {
            let name = "tester tester";
            let email = "test@test.hu";
            let address = undefined;
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): address cannot be undefined")
        }
    })

    it('test CustomerData with integer name', () => {
        try {
            let name = 1;
            let email = "test@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): name must be a string")
        }
    })

    it('test CustomerData with integer email', () => {
        try {
            let name = "tester tester";
            let email = 1;
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a string")
        }
    })

    it('test CustomerData with integer address', () => {
        try {
            let name = "tester tester";
            let email = "test@test.hu";
            let address = 1;
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): address must be a string")
        }
    })

    it('test CustomerData with empty name', () => {
        try {
            let name = "";
            let email = "test@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): name cannot be empty string")
        }
    })

    it('test CustomerData with empty email', () => {
        try {
            let name = "tester tester";
            let email = "";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email cannot be empty string")
        }
    })

    it('test CustomerData with empty address', () => {
        try {
            let name = "tester tester";
            let email = "test@test.hu";
            let address = "";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): address cannot be empty string")
        }
    })

    it('test CustomerData with wrong email format', () => {
        try {
            let name = "tester tester";
            let email = "testtest.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v2', () => {
        try {
            let name = "tester tester";
            let email = "test@testhu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v3', () => {
        try {
            let name = "tester tester";
            let email = "testtesthu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v4', () => {
        try {
            let name = "tester tester";
            let email = "test@.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v5', () => {
        try {
            let name = "tester tester";
            let email = "test@test.";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v6', () => {
        try {
            let name = "tester tester";
            let email = "@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with wrong email format v7', () => {
        try {
            let name = "tester tester";
            let email = "test@test .hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email must be a valid email address")
        }
    })

    it('test CustomerData with good inputs', () => {
        try {
            let name = "tester tester";
            let email = "test@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
        } catch (error) {
            assert.fail();
        }
    })
})