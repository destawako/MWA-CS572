angular.module("myProperApp").controller("SingleJokeController", SingleJokeController);

function JokeController($routeParams,JokeFactory){
    var vm = this;
    var jokeType = $routeParams.jokeType;
    JokeFactory.getOneJoke(jokeType).then(function(response){
        vm.joke = response;
    })
    // vm.joke = 
    // JokeFactory.getTenJokes().then(function(response){
    //     vm.jokes = response.data;
    // })
}

