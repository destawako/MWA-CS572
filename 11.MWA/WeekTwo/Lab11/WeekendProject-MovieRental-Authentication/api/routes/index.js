var express = require("express");
var router = express.Router();
var movieController =  require("../controllers/movie-controller");
var actorsController = require("../controllers/actors-controller");
let controllerUsers = require("../controllers/users-controllers")


router.route("/api/movies")
   .get(movieController.getAllMovies)
   .post(movieController.addOneMovie);

router.route("/api/movies/:movieId")
   .get(movieController.getOneMovie)
   .put(movieController.updateOneMovie)
   .delete(movieController.deleteOneMovie);

router.route("/api/movies/:movieId/actors")
   .get(actorsController.getAllActors)
   .post(actorsController.addOneActor)

router.route("/api/movies/:movieId/actors/:actorId")
   .get(actorsController.getActorById)
   .put(actorsController.updateOneActor)
   .delete(actorsController.deleteOneActor)

router.route("/api/users/register")
   .post(controllerUsers.register)
   
router.route("/users/login")
   .post(controllerUsers.login)

module.exports = router;