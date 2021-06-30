const Mongoose = require("mongoose")
const { parse } = require("path")
const Game = Mongoose.model("Game")

module.exports.getOneGame = function(req, res) {
    console.log("get one games ")
    var gameId = req.params.gameId
    console.log(gameId)
    Game.findById(gameId).exec(function(err, game) {
        var response = {
            status: 200,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = err;
            //res.status(500).json(err);
        } else if (!game) {
            response.status = 400
            response.message = { "message": "game id not found" };
            //res.status(400).json({  });
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.getAllGame = function(req, res) {
    Game.find().exec(function(err, docs) {
        var response = {
            status: 200,
            message: docs
        }
        if (err) {
            console.log("from err")
            response.status = 404,
                response.message = []
        } else {
            res.status(response.status).json(response.message)
        }
    })
}
module.exports.addOneGame = function(req, res) {
    console.log(req.body)
    Game.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        rate: parseFloat(req.body.rate),
        designers: req.body.designers,
        publisher: { name: "empty", location: [] },
        minAge: parseInt(req.body.minAge),
        review: req.body.review
    }, function(err, game) {
        if (err) {
            console.log("Error creating games");
            res.status(400).json(err)
        } else {
            console.log("Game created", game);
            res.status(201).json(game)
        }
    })
}

module.exports.updateGameOne = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, docs) {
        var response = { status: 204 }
        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = err;
        } else if (!docs) {
            response.status = 404
            response.message = {
                "message": "gameId not found"
            }
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            docs.title = req.body.title,
                docs.year = parseInt(req.body.year),
                docs.price = parseFloat(req.body.price),
                docs.minPlayers = parseInt(req.body.minPlayers),
                docs.maxPlayers = parseInt(req.body.maxPlayers),
                docs.rate = parseFloat(req.body.rate),
                docs.designers = req.body.designers,
                docs.minAge = parseInt(req.body.minAge)
            docs.save(function(err, updateDocs) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    res.status(response.status).json(response.message);
                }
            })
        }

    })
}

module.exports.deleteOneGame = function(req, res) {
    var gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame) {
        var response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            response.status = 404;
            response.message = {
                "message": "Game ID not found"
            }
        }
        res.status(response.status).json(response.message)
    })
}