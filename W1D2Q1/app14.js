const express= require("express");
const path= require("path");
const { nextTick } = require("process");

const app= express();
app.set("port",5050);
// app.get("/",function(req,res){

//     console.log("GET received.");

//     res.status(200).sendFile(Path.join(__dirname,"public","index.html"));

// });
// app.use(function(req,res){
//     console.log(req.method,req.url);
//     next();
// });
app.use(express.static(path.join(__dirname, "public")));

app.get("json",function(req,res){

    console.log("JSON request received");
    res.status(200).json({"jsonData":true})
});
 const server=app.listen(app.get("port"),function(){
    //const port=server.address().port;
    console.log("listening to port",server.address(). port);
});