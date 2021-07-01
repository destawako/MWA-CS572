var fs = require("fs");

console.log("Going to get a file");
fs.readFile("shortFile.txt", function(err, file){
    console.log("Got the file");

});

console.log("App still continues.....")
