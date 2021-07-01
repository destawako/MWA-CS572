var fileName = "index.js";
var hello = function(name){
    console.log("Hello " + name );
}

var intro = function(){
    console.log("I am node file called " + fileName);
}

module.exports = {
    greeting : hello,
    intro : intro
}