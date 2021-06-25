require("./api/data/db");

const express = require("express");
const path = require("path");
const routes = require("./api/routes");
const bodyParser = require("body-parser");

const app = express();

//setting the port
app.set("port",3000);

//middleware
app.use(function(req,res,next){
    next();
});

// using all the static files in our code
app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended:false}));

//telling the app to use "/api" route for all our routes. 
app.use("/api",routes);

// listening to the port 
const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
});