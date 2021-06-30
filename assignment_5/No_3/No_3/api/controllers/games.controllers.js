const mongoose = require("mongoose");
const Game = mongoose.model("Game");
var ObjectId = require("mongodb").ObjectId;

var runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lgn);
    const lat = parseFloat(req.query.lat);
    //GeoJSON Point
    const point = {
        type:"Point", 
        coordinate: [lng, lat]
    };

    Game.aggregate([
        {
            "$geoNear":{
                "near": point,
                "spherical":true, 
                "distanceField":"distance", 
                "maxDistance": 750000, 
                // "$limit":5
            }
        }
    ], function(err, results){
        console.log("Geo results", results);
        console.log("Geo error", err);
        res.status(200).json(results);
    }
    )
}

module.exports.gamesGetAll = function(req,res){
    console.log("Get all games");

    var offset=0;  /// it will escape the first offset and bring the number of counts you give
    var count=29;
    const maxCount =29;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    };
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    };
    if(req.query && req.query.lat && req.query.lng ){
        runGeoQuery(req, res);
        return;
    }
    // To verify if the input entered on the browser is a number or not ("must do")
    if(isNaN(offset) || isNaN(count)) {
        res.status(400).json({"message":"Query String offset and count should be numbers"});
        return;
    }

    // To limit user's maximum data to see on the browser ("must do") ("LImit Checking")
    if(count >maxCount){
        res.status(400).json({"message":"Count exceeds maximum of "+maxCount});
        return;
    }



    //Using Mongooose
    Game.find().skip(offset).limit(count).exec(function(err,games){
        //checking on the error happened by our system . It is not user's error ("Error Checking ")
        if(err){
            console.log("Err finding games ");
            res.status(500).json(err);
        }else{
            console.log("Found games ",games.length);
            res.status(200).json(games);
        }
        
    });

}

module.exports.gamesGetOne = function(req,res){

    console.log("Getting one Game");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findById(gameId).exec(function(err,game){

        const response ={
            status:200,
            message:game
        };
        
        if(err){
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!game){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Game ID not found."};
        }
        res.status(response.status).json(response.message);
        
    });

    //finding the game from the collection we got
    // collection.findOne({_id:ObjectId(gameId)},function(err,doc){
    //     console.log("Found game ",doc);
    //     res.status(200).json(doc);
    // });
}

module.exports.gamesAddOne=function(req,res){
    console.log("POST to add a game");
    var newGame;

    if(req.body && req.body.title && req.body.price){
        Game.create({
            title : req.body.title,
            year: req.body.year,
            rate: req.body.rate,
            price : req.body.price,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            publisher: "",
            reviews: "",
            minAge: req.body.minAge,
            designers: req.body.designers}, function(err, game) {
                const response = {
                    status:201,
                    message: game
                }           
                if(err){
                    response.status = 400;
                    response.message = err;
                }    
                res.status(response.status).json(response.message);
        });
        console.log(newGame);
        Game.create();
    } else{
        console.log("Data missing from POST body");
        res.status(400).json({error:"Required data missing from POST"});
    }
}

module.exports.gamesUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game){
        const response =  {
            status : 204,
            message : game
        }
        if(err){
            response.status=400;
            response.message = err;
        } else if(!game){
            response.status=404;
            response.message = {"message": "Game ID not found"};
        } 

        //this means somethoing went wrong
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
            //we got a game, now we neet to update it
            game.title = req.body.title;
            game.year  = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.rate = parseInt(req.body.rate);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge = parseInt(req.body.minAge);
            game.designers = req.body.designers;
            game.save(function(err, updateGame) {
                response.message = updateGame;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }

    });
    
}

module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response =  {
            status : 204,
            message : deletedGame
        }
        if(err){
            response.status=400;
            response.message = err;
        } else if(!deletedGame){
            response.status=404;
            response.message = {"message": "Game ID not found"};
        } 
        res.status(response.status).json(response.message);
        

    });
    
}