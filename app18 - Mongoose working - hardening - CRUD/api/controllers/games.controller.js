const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  console.log("JSON request received");
  let offset = 0;
  let count = 5;
  const maxCount = 8;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  // hardening
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Query offset or count is not a number" });
    return;
  }

  if (count > maxCount) {
    count = maxCount;
    res.status(400).json({ message: "cannot exceed count of " + maxCount });
  }

  console.log("offset ", offset, " count ", count);

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      if (err) {
        console.log("Error finding games", err);
        res.status(500).json(err);
      } else {
        console.log("Found games", games);
        res.status(200).json(games);
      }
    });
};

module.exports.gamesGetOne = function (req, res) {
  console.log("GetOne request received");
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 400;
      response.message = { message: "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("POST new Game");
  console.log(req.body);
  const newGame = {
    title: req.body.title,
    price:parseFloat(req.body.price),
    year: parseInt(req.body.year),
    minPlayer: parseInt(req.body.minPlayer),
    maxPlayer: parseInt(req.body.maxPlayer),
    mindAge: parseInt(req.body.mindAge),
    rate: parseInt(req.body.rate),
    designers: req.body.designers,
    publisher:{}
  }
  Game.create(newGame, function(err,game){
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error creating game");
      response.status = 500;
      response.message = err;
    } 
    res.status(response.status).json(response.message);
  }  
)};
