require("./Hello");
var goodBye = require("./index");
const talk = require("./talk");
goodBye();

console.log("===================")

var gBye = require("./talk");
talk.greeting("Biniam Arefaine");
talk.intro();
console.log("===================")

var question = require("./question");
var answer = question.ask("How can we control the seven chakras in spritual world?");
console.log(answer)



