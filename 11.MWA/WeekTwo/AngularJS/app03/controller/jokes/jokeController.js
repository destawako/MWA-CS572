angular.module("myProperApp").controller("JokeController", JokeController);

function JokeController($http){
    var vm = this;
    // vm.name = "Jack";
    $http.get("https://angularjs.org/")
    .then(function(response){
        vm.jokes = response.data;
    })
}

