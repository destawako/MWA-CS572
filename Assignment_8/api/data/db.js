const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/jobSearch";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose discconnected.");
});

mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error " + err);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by application termination");
        process.exit(0);
    });

});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by application termination");
        process.exit(0);
    });

});

require("./jobs-model.js");