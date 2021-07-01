var express = require("express");
var path = require("path");

var meangames = express();

meangames.set("port", 8888);

meangames.use(express.static(path.join(__dirname, "public")))

var server = meangames.listen(meangames.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port)
});


