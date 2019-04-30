const assert = require('assert');

const getDatabaseConnection = require('../database/DatabaseConnection').getDatabaseConnection;

async function initShutterColors() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_colors')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([
                    {
                        color: "red"
                    },
                    {
                        color: "green"
                    },
                    {
                        color: "blue"
                    },
                    {
                        color: "yellow"
                    },
                    {
                        color: "white"
                    },
                    {
                        color: "black"
                    }
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(6, response.insertedCount, "Could not insert order");
                })
        }
    });
}

async function initShutterMaterials() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_materials')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([
                    {
                        material: "wood"
                    },
                    {
                        material: "metal"
                    },
                    {
                        material: "plastic"
                    }
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(3, response.insertedCount, "Could not insert order");
                })
        }
    });
}

async function initShutterTypes() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_types')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([
                    {
                        type: "basic"
                    },
                    {
                        type: "with bug-screen"
                    }
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(2, response.insertedCount, "Could not insert order");
                })
        }
    });
}

async function initOrders() {
    const db = await getDatabaseConnection();
    const collection = db.collection('orders')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([
                    {
                        customerData:  {
                            name: "Kis Pál",
                            email: "kispal@mail.com",
                            address: "3525 Msikolc Hősök tere 1."
                        },
                        invoice: {
                            price: 149000,
                            isPaid: false
                        },
                        comment: "No comment",
                        isInstalled: false,
                        windows: [  
                            {
                                width: 200,
                                height: 300,
                                shutter: {
                                    seqNo: 1,
                                    color: "white",
                                    material: "plastic",
                                    type: "basic",
                                    parts: [
                                        {
                                            count: 30,
                                            description: "200mm wide, white plastic rod"
                                        },
                                        {
                                            count: 2,
                                            description: "Rope"
                                        }
                                    ],
                                    isFinished: true
                                }
                            }
                        ]
                    },
                
                    {
                        customerData:  {
                            name: "Kis Pál",
                            email: "kispal@mail.com",
                            address: "3525 Msikolc Hősök tere 1."
                        },
                        invoice: {
                            price: 149000,
                            isPaid: false
                        },
                        comment: "No comment",
                        isInstalled: false,
                        windows: [  
                            {
                                width: 200,
                                height: 300,
                                shutter: {
                                    id: 2,
                                    color: "white",
                                    material: "plastic",
                                    type: "basic",
                                    parts: [
                                        {
                                            count: 30,
                                            description: "200mm wide, white plastic rod"
                                        },
                                        {
                                            count: 2,
                                            description: "Rope"
                                        }
                                    ],
                                    isFinished: false
                                }
                            }
                        ]
                    },
                
                    {
                        customerData:  {
                            name: "Kis János",
                            email: "kisjanos@mail.com",
                            address: "3525 Msikolc Hősök tere 2."
                        },
                        comment: "No comment",
                        isInstalled: false,
                        windows: [  
                            {
                                width: 200,
                                height: 300,
                                shutter: {
                                    id: 3,
                                    color: "white",
                                    material: "plastic",
                                    type: "basic",
                                    parts: [
                                        {
                                            count: 30,
                                            description: "200mm wide, white plastic rod"
                                        },
                                        {
                                            count: 2,
                                            description: "Rope"
                                        }
                                    ],
                                    isFinished: false
                                }
                            }
                        ]
                    }
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(3, response.insertedCount, "Could not insert all orders");
                })
        }
    });

}

async function initDatabase() {
    await initShutterColors();
    await initShutterMaterials();
    await initShutterTypes();
    await initOrders();
}


module.exports = {
    initDatabase: initDatabase
}