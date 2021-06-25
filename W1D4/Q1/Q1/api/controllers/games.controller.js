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
    offset = parseInt(req.query.count);
  }
  if (count > maxCount) {
    count = maxCount;
  }

  console.log("offset ", offset, " count ", count);

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.gamesGetOne = function (req, res) {
  console.log("GetOne request received");
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    res.status(200).json(game);
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("POST new Game");
  console.log(req.body);
  res.status(201).json(req.body);
};
