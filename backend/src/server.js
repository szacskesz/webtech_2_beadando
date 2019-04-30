const express = require("express");
const bodyParser = require("body-parser");

const orderController = require("./controller/OrderController").routes;
const shutterDataController = require("./controller/ShutterDataController").routes;
const initDatabase = require('./database/InitDatabase').initDatabase;

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/order/', orderController);
app.use('/shutter-data/', shutterDataController);

app.listen(8080, () => {
    console.log("App is listening on port 8080");
})

initDatabase();

// export for testing
module.exports = app;