angular.module("movieRental").controller("MovieController", MovieController);

function _getStarRating(stars){
    return new Array(stars);
}

function MovieController($routeParams, MovieDataFactory){
    var vm = this;
    vm.title = "MEAN Movies App";

    var id = $routeParams.id;

    MovieDataFactory.getOneMovie(id)
        .then(function(response){
            console.log(response)
            vm.movie = response;
            vm.rating = _getStarRating(response.rate);
    });
}