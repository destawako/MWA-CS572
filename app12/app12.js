const express= require("express");
//const path= require("path");

const app= express();
app.set("port",3000);
app.get("/",function(req,res){

    console.log("GET received.");

    res.status(200).sendFile(Path.join(__dirname,"public"));

});
const server=app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("listining " + port);
});
