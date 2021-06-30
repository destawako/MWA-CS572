require("./api/data/db");
var express = require("express");
var path = require("path");

var routes = require("./api/routes");
var bodyParser = require('body-parser');


var app = express();
app.set("port", 4000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))
    //route for request body coming from ARC REST client and execute post request in index.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

var server = app.listen(app.get("port"), function() {
    var port = server.address().port;
    console.log("Listening to port " + port);
});