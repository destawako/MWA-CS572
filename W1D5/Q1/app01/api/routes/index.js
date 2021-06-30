var express = require("express");
var router = express.Router();

var controllerGames = require("../controllers/games.controllers"); 
const controllerPublishers = require("../controllers/publisher-controller");

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);


// all the methods related to the publisher
router.route("/games/:gameId/publisher")
.get(controllerPublishers.publisherGetOne)
.post(controllerPublishers.publisherAdd);

module.exports = router;