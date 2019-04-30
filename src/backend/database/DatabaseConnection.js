const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'webtech2_assignment';       // Database name

var databaseConnection;

const getDatabaseConnection = async () => {
    if(databaseConnection != undefined) {
        return databaseConnection;
    } else {
        try {
            const client = await MongoClient.connect(
                url,
                options={useNewUrlParser: true, auto_reconnect: true}
            );

            databaseConnection = client.db(dbName);
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