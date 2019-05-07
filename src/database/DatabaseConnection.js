const MongoClient = require('mongodb').MongoClient;
var DatabaseConstants = require('./DatabaseConstants');

var databaseConnection;

const getDatabaseConnection = async () => {
    if(databaseConnection != undefined) {
        return databaseConnection;
    } else {
        try {
            const client = await MongoClient.connect(
                DatabaseConstants.url,
                options={useNewUrlParser: true, auto_reconnect: true}
            );

            databaseConnection = client.db(DatabaseConstants.dbName);
            console.log(`Connected to database successfully`)
        } catch (error) {
            console.error(`Failed to connect ${error.stack}`)
        }

        return databaseConnection;
    }
}

connectToDatabase = async () => {
    await getDatabaseConnection();
}

module.exports = {
    getDatabaseConnection: getDatabaseConnection,
    connectToDatabase: connectToDatabase
}