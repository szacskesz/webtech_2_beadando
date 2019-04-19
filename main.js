const express = require("express");
const bodyParser = require("body-parser");

const orderController = require("./src/controller/OrderController").routes;
const shutterDataController = require("./src/controller/ShutterDataController").routes;

var app = express();
app.use(bodyParser.json());

app.use('/order/', orderController);
app.use('/shutter-data/', shutterDataController);

// app.use(express.static('src/public'));

app.listen(8080, () => {
    console.log("App is listening on port 8080");
})


