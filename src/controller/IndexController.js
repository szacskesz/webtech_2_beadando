const routes = require("express").Router();

routes.get('/', function(req, res, next) {
    res.render('index');
});
  
module.exports = {
    routes: routes
}