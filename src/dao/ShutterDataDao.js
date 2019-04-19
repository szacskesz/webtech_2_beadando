const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';    // Connection URL
const dbName = 'wetbech2_assignment';       // Database name


function getAllShutterColors(successCallback, errorCallback) {
    try {
        const collectionName = 'shutter_colors'       // Collection name

        var client = new MongoClient(url);
        client.connect((err)=>{
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)
    
            collection.find().toArray((err, colors) => {
                assert.equal(err, null);

                client.close();
                successCallback(colors)
            });
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

function getAllShutterMaterials(successCallback, errorCallback) {
    try {
        const collectionName = 'shutter_materials'       // Collection name

        var client = new MongoClient(url);
        client.connect((err)=>{
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)
    
            collection.find().toArray((err, materials) => {
                assert.equal(err, null);

                client.close();
                successCallback(materials)
            });
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

function getAllShutterTypes(successCallback, errorCallback) {
    try {
        const collectionName = 'shutter_types'       // Collection name

        var client = new MongoClient(url);
        client.connect((err)=>{
            assert.equal(null, err);
    
            const db = client.db(dbName);
            const collection= db.collection(collectionName)
    
            collection.find().toArray((err, types) => {
                assert.equal(err, null);

                client.close();
                successCallback(types)
            });
        })
    } catch (error) {
        //TODO delete console log
        console.log(error)
        errorCallback(error);
    }
}

module.exports = {
    "getAllShutterColors" : getAllShutterColors,
    "getAllShutterMaterials" : getAllShutterMaterials,
    "getAllShutterTypes" : getAllShutterTypes
}