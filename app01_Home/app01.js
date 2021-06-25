

var express = require("express");
var path = require("path");
var routes = require("./api/routes");
var bodyParser = require("body-parser");
require("./api/data/dbconnection").openConnection();

var app = express();

app.set("port",5000);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api",routes);

//json request received and send json data to the browser
// app.get("/json",function(req,res){
//     console.log("JSON REQUEST RECEIVED");
//     res.status(200).json({"jsonData":true});
// });
// // sending file to the browser
// app.get("/file",function(req,res){
//     res.sendFile(path.join(__dirname,"app13.js"));
// });

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
});