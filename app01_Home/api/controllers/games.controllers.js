
var gamesData = require("../data/games.json");
var dbConnection = require("../data/dbconnection");
var ObjectId = require("mongodb").ObjectId;

module.exports.gamesGetAll = function(req,res){
    console.log("Get all games");
    var db = dbConnection.get();
    
   //console.log("db",db);
    var collection = db.collection("games");
    var offset=0;
    var count=3;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    collection.find().skip(offset).limit(count).toArray(function(err,docs){
        console.log("Found Games", docs);
        res.status(200).json(docs);
    });
    // console.log(req.query);
    // var offset=0;
    // var count=5;
    // if(req.query && req.query.offset){
    //     offset = parseInt(req.query.offset,10);
    // }
    // if(req.query && req.query.count){
    //     count=parseInt(req.query.count,10);
    // }
    // var pageGames = gamesData.slice(offset,offset+count);
    // res.status(200).json(gamesData);
}
module.exports.gameGetSpecified = function(req,res){

    var db = dbConnection.get();
    
    //console.log("db",db);
     var collection = db.collection("games");

     var offset=0;
     var count=3;

     var gameSpecified = req.query.num;
     var count = parseInt(gameSpecified);
 
     if(req.query && req.query.offset){
         offset = parseInt(req.query.offset,7);
       
     }
     if(req.query && req.query.count){
         count = parseInt(req.query.count,7);
         if(count>=7){
             count=7;
         }
     }
     collection.find().skip(offset).limit(count).toArray(function(err,docs){
         console.log("Found Games", docs);
         res.status(200).json(docs);
     });
}


module.exports.gamesGetOne = function(req,res){

    // getting the connection
    var db = dbConnection.get();
    //getting the collection
    var collection = db.collection("games");
    var gameId = req.params.gameId;

    //finding the game from the collection we got
    collection.findOne({_id:ObjectId(gameId)},function(err,doc){
        console.log("Found game ",doc);
        res.status(200).json(doc);
    });

    // var theGame = gamesData[gameId];
    // console.log("GET game with game Id: " + gameId);
    // res.status(200).json(theGame);
}

module.exports.gamesAddOne=function(req,res){
    console.log("POST new game");

    var db = dbConnection.get();
    var collection = db.collection("games");
    if(req.body && req.body.name && req.body.starts){
        console.log(req.body);
        res.status(200).json(req.body);
    }
    else{
        console.log("Data missing from POST body");
        res.status(400).json({error:"Required data missing from POST"});
    }
    console.log(req.body);
    res.status(200).json(req.body);
}