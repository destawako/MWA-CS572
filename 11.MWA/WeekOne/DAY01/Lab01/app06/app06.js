var fs = require("fs");

var errFileFile = function(err, file){
    console.log("Got the file");

}
console.log("Going to get a file");
fs.readFile("shortFile.txt", errFileFile );

console.log("App still continues.....")
