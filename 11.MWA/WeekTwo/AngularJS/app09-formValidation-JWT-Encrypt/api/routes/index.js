var express = require("express");
var router = express.Router();
var gamecontrollers =require("../controllers/games-controllers");
const controllerPublisher = require("../controllers/publisher-controller");
const controllerUsers = require("../controllers/users-controllers");

router.route("/api/games").get(gamecontrollers.getCertainGames);
// router.route("/api/addnew_game").post(gamecontrollers.addNewGame);
router.route("/api/gamesgetone/:gameId").get(gamecontrollers.getOneGame);
router.route("/api/games/:gameId/publishers").get(controllerPublisher.publisherGetOne);
//
router.route("/users/register")
.post(controllerUsers.register);
module.exports=router;
