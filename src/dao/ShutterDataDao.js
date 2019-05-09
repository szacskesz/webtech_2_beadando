const assert = require('assert');
const DatabaseConstants = require('../database/DatabaseConstants');
const getDatabaseConnection = require('../database/DatabaseConnection').getDatabaseConnection;

async function getAllShutterColors(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection(DatabaseConstants.collections.shutterColors);

    collection.find().toArray((err, colors) => {
        try {
            assert.equal(null, err, err);

            successCallback(colors)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getAllShutterMaterials(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection(DatabaseConstants.collections.shutterMaterials);

    collection.find().toArray((err, materials) => {
        try {
            assert.equal(null, err, err);

            successCallback(materials)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getAllShutterTypes(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection(DatabaseConstants.collections.shutterTypes);

    collection.find().toArray((err, types) => {
        try {
            assert.equal(null, err, err);

            successCallback(types)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

module.exports = {
    "getAllShutterColors" : getAllShutterColors,
    "getAllShutterMaterials" : getAllShutterMaterials,
    "getAllShutterTypes" : getAllShutterTypes
}