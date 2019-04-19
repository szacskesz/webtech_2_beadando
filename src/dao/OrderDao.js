const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';    // Connection URL
const dbName = 'wetbech2_assignment';       // Database name
const collectionName = 'orders'             // Collection name

function getAllOrders(successCallback, errorCallback) {
    try {
        var client = new MongoClient(url);
        client.connect((err) => {
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)
    
            collection.find().toArray((err, orders) => {
                assert.equal(err, null);

                client.close();
                successCallback(orders)
            });
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

function getAllOrdersByUsername(username, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url);
        client.connect((err) => {
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)
  
            collection.find(
                {
                    "costumer_data": {
                        "name": username
                    }
                }
            ).toArray((err, orders) => {
                assert.equal(err, null);

                client.close();
                successCallback(orders)
            });
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

function createOrder(order, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url);
        client.connect((err) => {
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)

            collection.insertOne(order, (err,response) => {
                assert.equal(null, err);
                assert.equal(1, response.insertedCount);

                client.close();
                successCallback()
            })
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

function finishShutter(orderId, shutterId, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url);
        client.connect((err) => {
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)

            collection.update(
                {
                    "id": orderId,
                    "windows": [{
                        "shutter": {
                            "id": shutterId
                        }
                    }]
                },
                {
                    $set: {
                        "windows.$.shutter.isFinished": true
                    }
                },
                (err, response) => {
                    assert.equal(null, err);
                    assert.equal(1, response.insertedCount);

                    client.close();
                    successCallback()
                }
            )
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    } 
}

function createInvoiceForOrder(orderId, invoice, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url);
        client.connect((err) => {
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)

            collection.update(
                {
                    "id": orderId
                },
                {
                    $set: {
                        //TODO json stringify?
                        "invoice": invoice
                    }
                },
                (err, response) => {
                    assert.equal(null, err);
                    assert.equal(1, response.insertedCount);

                    client.close();
                    successCallback()
                }
            )
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

module.exports = {
    "getAllOrders" : getAllOrders,
    "getAllOrdersByUsername" : getAllOrdersByUsername,
    "createOrder" : createOrder,
    "finishShutter": finishShutter,
    "createInvoiceForOrder": createInvoiceForOrder
}