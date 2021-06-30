require("./game-model-schema.js")
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/meanGames";
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", function() {
    console.log("mongoose connected to " + dbURL)
})
mongoose.connection.on("disconneted", function() {
    console.log("mongoose disconnected from " + dbURL)
})
mongoose.connection.on("error", function(err) {
    console.log(err)
})
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by apptermination");
        process.exit(0);
    });
});
//terminate
process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by apptermination");
        process.exit(0);
    });
});
//restart
process.once("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by apptermination");
        process.kill(process.pid, "SIGUSR2");
    });
});