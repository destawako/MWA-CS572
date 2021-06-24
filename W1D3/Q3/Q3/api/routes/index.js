var express= require("express");
var router= express.Router();
var agamesController = require("../controllers/gamesController");
router.route("/games/:number").get(agamesController.getGames);
module.exports = router;
 