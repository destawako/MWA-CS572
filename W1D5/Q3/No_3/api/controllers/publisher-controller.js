const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function(req,res){
    
    var gameId = req.param.gameId;
    console.log("Get gameId ", gameId);
    
    Game.findById(gameId).select("publisher").exec(function(err,game){
        var publisher = game.publisher;
        var response = {status:200, message:[]};
        if(err){
            console.log("Error Finding game");
            response.status = 500;
            response.message = err;
        } else if(!game){
            console.log("Game id not found in database", id);
            response.status = 404; 
            response.message = {"message" : "Game ID not fount" + gameId};
        } else{
            response.message = game.publisher? game.publisher : [];
        }

        res.status(response.status).json(response.message);
    });
}

var _addPublisher = function(req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatedGame) {
        var response = {status:200, message:[]};
        if(err){
            response.status = 500;
            response.message = err;
        } else{
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherAdd = function(req, res){
    var gameId = req.param.gameId;
    console.log("Get gameId", gameId);

    Game.findById(gameId).select(publisher).exec(function (err, game) {
        var response = {status:200, message:[]};
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if(!game){
            console.log("Game id not found in database", id);
            response.status = 404;
            response.message = {"message":"Game ID not fount " + gameId};
        }

        if(game){
            _addPublisher(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    });
}