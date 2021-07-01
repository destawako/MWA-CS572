angular.module("myProperApp").controller("MainController", MainController);

function MainController($http){
    var vm = this;
    vm.name = "Jack";
    // $http.get("https://angularjs.org/")
    // .then(function(response){
    //     vm.jokes = response.data;
    // })
}

