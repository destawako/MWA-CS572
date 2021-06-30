var express = require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers"); 
const controllerReviews = require("../controllers/reviews-controller");

router.route("/games/")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesUpdateOne)
    .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerReviews.reviewsAddOne);

router.route("/games/:gameId/reviews/:reviewId")
    .get(controllerReviews.reviewsGetOne)
    .put(controllerReviews.reviewsUpdateOne)
    .delete(controllerReviews.reviewsDeleteOne);

module.exports = router;