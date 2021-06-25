var express= require("express");
var router= express.Router();
var agamesController = require("../controllers/games.controller");
router.route("/games/:number").get(agamesController.getGames);
module.exports = router;
 