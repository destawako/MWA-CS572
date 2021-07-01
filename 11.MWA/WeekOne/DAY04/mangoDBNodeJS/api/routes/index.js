var express = require("express");
var router = express.Router();
var gamecontrollers =require("../controllers/games-controllers");

router.route("/api/games").get(gamecontrollers.getCertainGames);
router.route("/api/addnew_game").post(gamecontrollers.addNewGame);
router.route("/api/games_get_one/:gameId").get(gamecontrollers.getOneGame);
module.exports=router;