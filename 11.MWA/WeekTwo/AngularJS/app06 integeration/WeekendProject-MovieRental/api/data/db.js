const mongoose = require("mongoose");
require("./movies-model.js");
const dbURL = "mongodb://localhost:27017/movieRentalDB";

mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose is disconnected");
});

mongoose.connection.on("connected", function(){
    console.log("Mongoose is connected to " + dbURL);
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose is disconnected")
})


process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("mongoose is disconnected by CTRL + C")
        process.exit(0);
    });
});

process.on("SIGTERM",  function(){
    mongoose.connection.close(function(){
        console.log("mongoose is disconnected by CTRL + C");
        process.exit(0);
    });
});

// process.on("SIGUSR2",  function(){
//     mongoose.connection.close(function(){
//         console.log("mongoose is disconnected by application restart");
//         process.kill(process.pid, "SIGUSR2");
//     });
// });



