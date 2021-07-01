angular.module("myProperApp").controller("JokeController", JokeController);

function JokeController(JokeFactory){
    var vm = this;
    JokeFactory.getTenJokes().then(function(response){
        vm.jokes = response.data;
    })
}

