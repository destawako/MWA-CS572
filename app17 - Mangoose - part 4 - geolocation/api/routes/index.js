var express = require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controller");
var controllerPublisher = require("../controllers/publisher.controller");

router
 .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.publisherGetOne);

module.exports = router;
