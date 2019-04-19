const routes = require("express").Router();

var ShutterDataService = require("../service/ShutterDataService");
const shutterDataService = new ShutterDataService();

routes.get("/getAllShutterMaterials", (req, resp) => {
    shutterDataService.getAllShutterMaterials((materials) => {
        resp.status(200).send(materials);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.get("/getAllShutterTypes", (req, resp) => {
    shutterDataService.getAllShutterTypes((types) => {
        resp.status(200).send(types);
    }, (error) => {
        resp.status(400).send(error);
    });
})

routes.get("/getAllShutterColors", (req, resp) => {
    shutterDataService.getAllShutterColors((colors) => {
        resp.status(200).send(colors);
    }, (error) => {
        resp.status(400).send(error);
    });
})



module.exports = {
    routes: routes
}