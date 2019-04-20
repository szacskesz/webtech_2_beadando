const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = 'mongodb://localhost:27017';    // Connection URL
const dbName = 'wetbech2_assignment';       // Database name
const collectionName = 'orders'             // Collection name

function getAllOrders(successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)
        
                collection.find().toArray((err, orders) => {
                    try {
                        assert.equal(null, err, err);

                        client.close();
                        successCallback(orders)
                    } catch (error) {
                        errorCallback("" + error);
                    }
                });
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    }
}

function getAllOrdersByEmail(email, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)
    
                collection.find(
                    {
                        "customerData.email": email
                    }
                ).toArray((err, orders) => {
                    try {
                        assert.equal(null, err, err);

                        client.close();
                        successCallback(orders)
                    } catch (error) {
                        errorCallback("" + error);
                    }
                });
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    }
}

function getOrderById(orderId, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)
    
                collection.findOne(
                    {
                        "_id": ObjectID(orderId)   
                    },
                    (err, order) => {
                        try {
                            assert.equal(null, err, err);

                            client.close();
                            successCallback(order)
                        } catch (error) {
                            errorCallback("" + error);
                        }
                    }
                );
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    }
}

function createOrder(order, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)

                collection.insertOne(order, (err,response) => {
                    try {
                        assert.equal(null, err, err);
                        assert.equal(1, response.insertedCount, "Could not insert order");

                        client.close();
                        successCallback(response.insertedId)
                    } catch (error) {
                        errorCallback("" + error);
                    }
                })
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    }
}

function finishShutter(orderId, shutterId, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)

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

                            client.close();
                            successCallback()
                        } catch (error) {
                            errorCallback("" + error);
                        }
                    }
                )
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    } 
}

function createInvoiceForOrder(orderId, invoice, successCallback, errorCallback) {
    try {
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect((err) => {
            try {
                assert.equal(null, err, err);
        
                const db = client.db(dbName);
                const collection= db.collection(collectionName)

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

                            client.close();
                            successCallback()
                        } catch (error) {
                            errorCallback("" + error);
                        }
                    }
                )
            } catch (error) {
                errorCallback("" + error);
            }
        })
    } catch (error) {
        errorCallback("" + error);
    }
}

module.exports = {
    "getAllOrders" : getAllOrders,
    "getAllOrdersByEmail" : getAllOrdersByEmail,
    "getOrderById": getOrderById,
    "createOrder" : createOrder,
    "finishShutter": finishShutter,
    "createInvoiceForOrder": createInvoiceForOrder
}