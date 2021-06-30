const express = require("express");
const router = express.Router();
const gameController = require("../controller/game-controller.js")
const publisherController = require("../controller/publisherController")
const reviewController = require("../controller/reviewController")
router.route("/game")
    .get(gameController.getAllGame)
    .post(gameController.addOneGame);

router.route("/game/:gameId/publisher")
    .get(publisherController.getPublisher)
    .post(publisherController.addPublisher)
    .put(publisherController.publisherUpdate)
    .delete(publisherController.deletePublisher)

router.route("/game/:gameId")
    .get(gameController.getOneGame)
    .put(gameController.updateGameOne)
    .delete(gameController.deleteOneGame)

router.route("/game/:gameId/review")
    .get(reviewController.getReview)
    .post(reviewController.addToReview)


router.route("/game/:gameId/review/:reviewId")
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview)
module.exports = router;