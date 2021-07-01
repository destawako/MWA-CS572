var mongoose = require("mongoose");
const { use } = require("../routes");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs")

module.exports.register = function(req, res){
    console.log("Register user is reached")
    var username = req.body.username
    var name = req.body.name || null;
    var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

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

module.exports.login = function(req,res){
    console.log("Logging to user")
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username,
        password: password
    })
        .exec(function(err, user){
            if(err){
                console.log(err);
                res.status(400).json(err);
            }
            if(user){
                console.log(user);
                res.status(200).json(user);
            }else{
                console.log(" user not found");
                res.status(400).json("Unauthorized");
            }
        })
}