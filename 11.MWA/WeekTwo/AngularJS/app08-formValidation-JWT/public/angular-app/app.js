// is going to hold application module and route
angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/game-list/games.html",
        controller : "GamesController",
        controllerAs: "vm"
    })
    .when("/games/:id", {
        templateUrl: "angular-app/game-display/game.html",
        controller : "GameController",
        controllerAs: "vm"
    })
    .when("/register", {
           templateUrl: "angular-app/register/register.html",
           controller: "RegisterController",
           controllerAs: "vm"
    });
}
