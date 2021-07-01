angular.module("movieRental").directive("moviesNavigation",MoviesNavigation );

function MoviesNavigation(){
    return{
        restrict: "E",
        templateUrl:"angular-app/navigation-directive/navigation-directive.html"
    };
}