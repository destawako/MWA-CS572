const mongoose = require("mongoose")
const Game = mongoose.model("Game")
module.exports.getPublisher = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, docs) {
        var response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!docs) {
            response.status = 404;
            response.message = "gameId not found"
        } else {
            response.message = docs.publisher ? docs.publisher : [];
        }
        res.status(response.status).json(response.message)
    })
}

const _addPublisher = function(req, res, docs) {
    docs.publisher.name = req.body.name;
    docs.publisher.location.coordinates = [parseInt(req.body.lat), parseInt(req.body.long)]
    docs.save(function(err, updatedDocs) {
        var response = {
            status: 200,
            message: []
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = updatedDocs.publisher;
        }
        res.status(response.status).json(response.message)
    })
}

module.exports.addPublisher = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, docs) {
        var response = { status: 200, message: [] }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!docs) {
            response.status = 400;
            response.message = "GameId not found"
        }
        if (docs) {
            _addPublisher(req, res, docs);
        } else {
            res.status(response.status).json(response.message)
        }
    })
}

var _updatePublisher = function(req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.long), parseFloat(req.body.lat)];
    game.save(function(err, updateGame) {
        var response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
module.exports.publisherUpdate = function(req, res) {
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function(err, game) {
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
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req, res, game);
        }
    })
}

var _deletePublisher = function(req, res, game) {
    game.publisher.remove
    game.save(function(err, game) {
        var response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = err;
        }
        res.status(response.status).json(response.message)
    })
}
module.exports.deletePublisher = function(req, res) {
    var gameId = req.params.gameId
    console.log("PUT gameId ", gameId)
    Game.findById(gameId).select("-reviews").exec(function(err, game) {
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
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            _deletePublisher(req, res, game);
        }
    })
}