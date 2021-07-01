angular.module("movieRental").directive("movieRating", MovieRating); // means movie-rating

function MovieRating(){
    return {
        restrict: "E", // E - element,  A - attribute
        templateUrl : "angular-app/movie-rating/rating.html",
        bindToController: true,
        controller: "MovieController",
        controllerAs: "vm",
        scope: {
            start: "@"
        }
    }
}