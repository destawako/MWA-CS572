var express = require("express");
var path = require("path")
var routes = require("./api/routes");
var bodyParser = require("body-parser");


const app = express();

app.set("port", 8080);
app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use("/", function(req, res, next) {
    res.header('Access-Control-Allow-Methods', '*');  // Bad idea (you know why, think of security)
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
     
    next();
  });
app.use("/", routes);
// Add this to the api provider code (backend app.js code)

app.use(express.static(path.join(__dirname, "/public")));
// app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));


var server = app.listen(app.get("port"), function(){
    var port  = server.address().port;
    console.log("Listening to port " , port);
})

