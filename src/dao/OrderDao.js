const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const DatabaseConstants = require('../database/DatabaseConstants');
const getDatabaseConnection = require('../database/DatabaseConnection').getDatabaseConnection;

async function getAllOrders(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.find().toArray((err, orders) => {
        try {
            assert.equal(null, err, err);

            successCallback(orders)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getAllOrdersByEmail(email, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.find(
        {
            "customerData.email": email
        }
    ).toArray((err, orders) => {
        try {
            assert.equal(null, err, err);

            successCallback(orders)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getOrderById(orderId, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.findOne(
        {
            "_id": ObjectID(orderId)   
        },
        (err, order) => {
            try {
                assert.equal(null, err, err);

                successCallback(order)
            } catch (error) {
                errorCallback("" + error);
            }
        }
    );
}

async function createOrder(order, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.insertOne(order, (err,response) => {
        try {
            assert.equal(null, err, err);
            assert.equal(1, response.insertedCount, "Could not insert order");

            successCallback(response.insertedId)
        } catch (error) {
            errorCallback("" + error);
        }
    })
}

async function finishShutter(orderId, shutterId, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.updateOne(
        {
            "_id": ObjectID(orderId),
            "windows.shutter.id": shutterId
        },
        {
            $set: {
                "windows.$.shutter.isFinished": true
            }
        },
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function finishInstallation(orderId, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.updateOne(
        {
            "_id": ObjectID(orderId)
        },
        {
            $set: {
                "isInstalled": true
            }
        },
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function createInvoiceForOrder(orderId, invoice, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(DatabaseConstants.collections.orders)

    collection.updateOne(
        {
            "_id": ObjectID(orderId)
        },
        {
            $set: {
                "invoice": invoice
            }
        },
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

module.exports = {
    "getAllOrders" : getAllOrders,
    "getAllOrdersByEmail" : getAllOrdersByEmail,
    "getOrderById": getOrderById,
    "createOrder" : createOrder,
    "finishShutter": finishShutter,
    "finishInstallation": finishInstallation,
    "createInvoiceForOrder": createInvoiceForOrder
}