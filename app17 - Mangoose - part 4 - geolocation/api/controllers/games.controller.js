// const e = require("express");
// const dbConnection = require("../data/dbconnection");
// const objectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

const Game = mongoose.model("Game");


module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  Game.find().exec(function (err, games) {
    console.log("Found games", games.length);
    res.json(games);
  });
};

module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games.length);
      res.json(games);
    });
};

module.exports.gamesGetOne = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    res.status(200).json(game);
  });
};

// done by professor

module.exports.getGames = function (req, res) {
  console.log("Json request received");
  var offset = 0;
  var count = 5;
  const maxCount = 8;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (count > maxCount) {
    count = maxCount;
  }
  console.log("offset ", offset, "count ", count);

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};
