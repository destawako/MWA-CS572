var express = require("express");
var path = require("path");
var app = express();
app.set("port", 3000);
app.get("/", function(req, res){
    console.log("Get received");
    res.status(404).send("Received your GET request")
});

var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
})
app.get("/json", function(req, res){
    res.status(200).json({"jsonData" : true});
});

var path = require("path");
app.get("/file", function(req, res){
    console.log("File requested received");
    res.status(200).sendFile(path.join(__dirname, "app11.js"));

});
