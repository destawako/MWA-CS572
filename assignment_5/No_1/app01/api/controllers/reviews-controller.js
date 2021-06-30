const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// Getting all the reviews
module.exports.reviewGetAll = function(req,res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err,doc){
        res.status(200).json(doc.reviews);
    });
}

//Getting One of the Reviews
module.exports.reviewGetOne = function(req,res){
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("GET reviewId "+reviewId+"for gameId "+gameId);
    Game.findById(gameId).select("reviews").exec(function(err,game){
        const review = game.reviews.id(reviewId);
        res.status(200).json(review);

    });
    
}

