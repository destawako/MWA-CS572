var mongoose = require("mongoose");
const { use } = require("../routes");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
const { response } = require("express");

module.exports.register = function (req, res) {
  console.log("Registering User");

  var username = req.body.username;
  var name = req.body.name || null;
  var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  User.create(
    {
      username: username,
      name: name,
      password: password,
    },
    function (err, user) {
      const response = {
        status: 201,
        message: user,
      };
      if (err) {
        (response.status = 500), (response.message = err);
      }

      res.status(response.status).json(response.message);
    }
  );
};

module.exports.login = function (req, res) {
  console.log("Logging in");
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).exec(function (err, user) {
    const response = {
      status: 200,
      message: user,
    };
    if (err) {
      (response.status = 500), (response.message = err);
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log("user found", user);
        var token = jwt.sign({username: user.username}, "cs572", {
          expiresIn: 3600,
        });
        response.status = 200;
        response.message = { success: true, token: token };
        res.status(response.status).json(response.message);
      } else {
        (response.status = 401),
          (response.message = { message: "Unauthorized" });
      }
    } else {
      (response.status = 400), (response.message = { message: "Unauthorized" });
    }
  }
 
  );
};

module.exports.authenticate = function (req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "cs572", function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).json("Unauthorized");
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json("No token provided");
  }
};
