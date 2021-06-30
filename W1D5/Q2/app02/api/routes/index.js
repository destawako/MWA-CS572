var express = require("express");
var router = express.Router();

var controllerGames = require("../controllers/games.controllers"); 
const controllerPublisher = require("../controllers/publisher-controller");

// Game Methods
router.route("/games")
.get(controllerGames.gamesGetAll)           //  GET all Games
.post(controllerGames.gamesAddOne);         //  POST One Game to the DB

// Game Methods 
router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)           // GET One Game from the DB
.put(controllerGames.gamesUpdateOne)        // PUT One Game from the DB
.delete(controllerGames.gamesDeleteOne);    // DELETE One Game from the DB


// Publisher Methods
router.route("/games/:gameId/publisher")
.get(controllerPublisher.publisherGetOne)      // GET
.post(controllerPublisher.publisherAdd)        // POST
.put(controllerPublisher.publisherUpdate)      // PUT
.delete(controllerPublisher.publisherDelete);  // DELETE


module.exports = router;