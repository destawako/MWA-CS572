var child_process = require("child_process");
console.log("1: Starting the app");
var newProcess = child_process.spawn("node", ["fibonacci/_fibonacci.js"], { stdio: "inherit"});
console.log("2: Ending the app");

