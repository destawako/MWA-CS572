const { off } = require("process");
const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const ObjectId = require("mongodb").ObjectId;

module.exports.getCertainGames = function(req, res){
    var offset = 4;
    var count = 3;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > 7){
            count = 7;
        }
    };


    //using mongooose
    Game.find().skip(offset).limit(count).exec(function(err, games){
        console.log("Found Games ", games.length);
        res.json(games);
    })
    
}

module.exports.addNewGame = function(req, res){
    console.log("POST to add a game");

    var db = dbConnection.get();
    var collection = db.collection("games");
    var newGame;
    console.log(req.body + "=================");
    if(req.body){
        newGame = req.body;
        // newGame.price = parseFloat(req.body.price);
        // newGame.title = req.body.title;
        // newGame.year = parseInt(req.body.year);
        // newGame.rate = parseInt(req.body.rate);
        // newGame.minPlayers = parseInt(req.body.minPlayers);
        // newGame.maxPlayers = parseInt(req.body.maxPlayers);


        console.log(newGame);
        collection.insertOne(newGame, function(err, response){
            console.log("--------------------" + response.ops);
            res.status(201).json(req.body);
        });
        console.log(req.body);
    }else {
        console.log("Data missing from POSt body");
        res.status(400).json({error: "Required data missing from POST"});
    }
}

module.exports.getOneGame = function(req, res){

    // var db = dbConnection.get();
    // var collection = db.collection("games");
    const gameId = req.params.gameId;

    // collection.findOne({_id: ObjectId(gameId)}, function(err, doc){
    //     console.log("GET game with gameId: ", gameId);
    //     res.status(200).json(doc);

    // });

    Game.findById(gameId).exec(function(err, games){
        if(err){
            console.log("Found Errors ", err);
            return;
        }
        console.log("Found Games ", games.length);
        res.status(200).json(doc);   
     })



}