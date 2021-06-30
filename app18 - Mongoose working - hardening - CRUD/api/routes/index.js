const express = require("express");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publisher.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games/:gameId/publishers").get(controllerPublishers.publisherGetOne)
router.route("/games/:gameId/publishers").post(controllerPublishers.publisherAddOne)

module.exports = router;
