var mongoose = require("mongoose");
const { use } = require("../routes");
var User = mongoose.model("User");

module.exports.register = function(req, res){
    console.log("Register user is reached")
    var username = req.body.username
    var name = req.body.name;
    var password = req.body.password;

    User.create({
        username: username,
        name : name,
        password: password
    }, function(err, user){

        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            res.status(200).json(user);

        }
    })
}