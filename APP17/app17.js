const express= require("express");
const path= require("path");
const app=express();

app.set("port",5000);

app.get("/:val2",function(req,resp){

const val1=req.query.val1;
const val2=req.params.val2;

console.log(val1,val2)
console.log(parseInt(val1)*parseInt(val2))

})

app.listen(app.get("port"),function(){

console.log("server started with port",app.get("port"));
})
app.use(express.static(path.join(__dirname, "public")));

app.get("json",function(req,res){

    console.log("JSON request received");
    res.status(200).json({"jsonData":false})
});
 const server=app.listen(app.get("port"),function(){
    //const port=server.address().port;
    console.log("listening to port",server.address(). port);
});