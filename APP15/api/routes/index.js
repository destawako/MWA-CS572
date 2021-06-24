var express = require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers"); 

router.route("/games").get(controllerGames.gamesGetAll);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

router.route("/games/new").post(controllerGames.gamesAddOne);

router.route("/json").get(function(req,res){
    console.log("JSON request received");
    res.status(200).json({"jsonData":true});
}).post(function(req,res){
    console.log("POST json route request received");
    res.status(200).json({"jsonData":false});
});

router.route("/games/:gameId").get(controllerGames.gamesGetOne);


module.exports = router;