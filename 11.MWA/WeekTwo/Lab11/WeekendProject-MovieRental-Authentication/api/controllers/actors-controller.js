const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.getAllActors = function (req, res) {
  var movieId = req.params.movieId;
  console.log("movie id is" + movieId);

  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, actors) {
      const response = {
        status: 200,
        message: actors,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!actors) {
        response.status = 404;
        response.message = { message: "actors can not be found" };
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.getActorById = function (req, res) {
  var movieId = req.params.movieId;
  const actorId = req.params.actorId;

  console.log(movieId + "here" + actorId);

  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, docs) {
      console.log(docs + "here" + docs.actor);

      var actorsFound = docs.actors.id(actorId);
      console.log("here" + actorsFound);
      const response = {
        status: 200,
        message: actorsFound,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!docs) {
        response.status = 404;
        response.message = { message: "movie Id or actorsId is not found" };
      }

      res.status(response.status).json(response.message);
    });
};

var _addOneActor = function (req, res, actor) {
 
  let actors = {
    name: req.body.name,
    age: parseInt(req.body.age),
    bornin: req.body.bornin,
    awards: req.body.awards,
    education: req.body.education,
  };

  actor.actors.push(actors);

  console.log(actor.actors.education);
  actor.save(function (err, updatedActor) {
    const response = {
      status: 200,
      message: updatedActor,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedActor.actors;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addOneActor = function (req, res) {
  var movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, doc) {
      const response = {
        status: 200,
        message: doc,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { message: "Movie Id not found" };
      }

      console.log(doc);

      if (doc) {
        _addOneActor(req, res, doc);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

var _updateOneActor = function (req, res, actor) {
  console.log(req.body.name);
 let actorId = req.params.actorId

var selectedActor = actor.actors.id(actorId);

selectedActor.name = req.body.name;
selectedActor.age = parseInt(req.body.age);
selectedActor.bornin = req.body.bornin;
selectedActor.awards = req.body.awards;
selectedActor.education = req.body.education;
console.log(actor);



  actor.save(function (err, updatedActor) {
    console.log(actor);

    const response = {
      status: 204,
      message: updatedActor,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedActor.actors;
    }
    res.status(response.status).send(response.message);

    res.status(response.status).json(response.message);
  });
};


module.exports.updateOneActor = function (req, res) {
  var movieId = req.params.movieId;
  var actorId = req.params.actorId;
  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, actor) {
      var selectedActor = actor.actors.id(actorId);
      const response = {
        status: 204,
        message: [],
      };

      
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!selectedActor) {
        response.status = 404;
        response.message = { message: "Movie Id not found" };
      }


      if (actor) {
        _updateOneActor(req, res, actor);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

var _deleteOneActor = function (req, res, doc) {

var actorId = req.params.actorId;
var selectedActor = doc.actors.id(actorId);

  selectedActor.remove();
  doc.save(function (err, deletedActor) {
    const response = {
      status: 204,
      message: deletedActor,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = deletedActor.actors;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.deleteOneActor = function (req, res) {
  var movieId = req.params.movieId;
  var actorId = req.params.actorId;

  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, actor) {
      const response = {
        status: 204,
        message: [],
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!actor) {
        response.status = 404;
        response.message = { message: "Movie Id not found" };
      }


      if (actor) {
        _deleteOneActor(req, res, actor);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
