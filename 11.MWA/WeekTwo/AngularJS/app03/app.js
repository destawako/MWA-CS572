angular.module("myProperApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "template/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
    .when("/jokes", {
        templateUrl: "template/jokes.html",
        controller: "JokeController",
        controllerAs: "jokeCtrl"

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