require("./api/data/db");
var express = require("express");
var routes = require("./api/routes")
var path = require("path");
var bodyParser = require("body-parser");
// require("./api/data/dbconnection").openconnection();
const app = express();

app.set("port", 3000);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
// Add this to the api provider code (backend app.js code)
  app.use("/", function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');  // Bad idea (you know why, think of security)
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    next();
  });
app.use("/", routes);

var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
})

