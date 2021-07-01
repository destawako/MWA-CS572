angular.module("movieRental", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/movie-list/movies.html",
        controller : "MoviesController",
        controllerAs: "vm"
    })
    .when("/movie/:id", {
        templateUrl: "angular-app/movie-display/movie.html",
        controller : "MovieController",
        controllerAs: "vm"
    })
}
