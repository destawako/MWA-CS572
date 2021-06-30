const mongoose = require("mongoose")
const Game = mongoose.model("Game")

module.exports.getReview = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, docs) {
        var response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!docs) {
            response.status = 404;
            response.message = "gameId not found"
        } else {
            response.message = docs.reviews ? docs.reviews : [];
        }
        res.status(response.status).json(response.message)
    })
}
const _addToReview = function(req, res, game) {
    console.log("from outside")
    game.reviews.push({
        name: req.body.name,
        comment: req.body.comment
    })
    game.save(function(err, updatedGame) {
        console.log("from save")
        var response = {
            status: 200,
            message: []
        }
        if (err) {
            console.log("from err")
            response.status = 500;
            response.message = err;
        } else {
            console.log("from else")
            response.status = 200;
            response.message = updatedGame.reviews;
        }
        res.status(response.status).json(response.message)
    })
}

//})
//}
module.exports.addToReview = function(req, res) {
    const gameId = req.params.gameId;
    console.log(req.body)
    Game.findById(gameId).select("-publisher").exec(function(err, game) {
        var response = { status: 201, message: [] }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "game id not found" }
        }
        if (game) {
            _addToReview(req, res, game);
        } else {
            res.status(response.status).json(response.message)
        }

    })
}

module.exports.updateReview = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).exec(function(err, game) {
        var response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = err
        } else if (!game) {
            response.status = 404
            response.message = {
                "message": "Game ID not found"
            }

        } else {
            const checkReview = game.reviews.id(reviewId);
            if (!checkReview) {
                response.status = 404;
                response.message = "reviewId not found"
            } else {
                if (req.body && req.body.name && req.body.comment) {
                    Game.updateOne({ "_id": gameId, "reviews._id": reviewId }, {
                            $set: {
                                "reviews.$.name": req.body.name,
                                "reviews.$.comment": req.body.comment
                            }
                        }, function(err, newReview) {
                            var response = { status: 200, message: newReview }
                            if (err) {
                                response.status = 500
                                response.message = err;
                                console.log("from 500", err)
                            } else {
                                console.log("from else")
                                response.message = "product updated"
                            }
                            res.status(response.status).json(response.message);
                        })
                        /* game.reviews.id(reviewId).name = req.body.name;
                        game.reviews.id(reviewId).comment = req.body.comment;
                        game.save(function(err, newgame) {

                        })*/
                } else {
                    response.status = 400;
                    response.message = "required body not found"
                }
            }

        }

    })
}

module.exports.deleteReview = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).exec(function(err, game) {
        var response = { status: 204, message: [] }
        console.log(1);
        if (err) {
            response.status = 500
            response.message = err
        } else if (!game) {
            console.log("game");
            response.status = 404;
            response.message = "game not found"
        } else {
            console.log(2);
            const checkReview = game.reviews.id(reviewId);
            if (!checkReview) {
                console.log(3);
                response.status = 404;
                response.message = "review not found"
            } else {
                console.log(4);
                game.reviews.remove(reviewId)
                game.save(function(err, game) {
                    if (err) {
                        console.log("Error finding game");
                        response.status = 500
                        response.message = err;
                    }
                })
            }
        }
        res.status(response.status).json(response.message)
    })
}