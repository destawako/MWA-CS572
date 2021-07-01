angular.module("myProperApp",['ngRoute']).config(config)

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "template/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
    .when("/animes", {
        templateUrl: "template/anime.html",
        controller: "AnimeController",
        controllerAs: "animeCtrl"

    })
    .when("/about", {
        templateUrl: "template/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"

    })
    .otherwise({
        redirectTo: "/"
    });
}