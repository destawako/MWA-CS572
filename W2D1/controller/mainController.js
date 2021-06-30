angular.module("asgnm7").controller("MainController", MainController);

function MainController($http) {
    let vm = this;
    vm.name = "Desta";

    $http.get("https://jsonplaceholder.typicode.com/todos").then(function(response) {
        vm.users = response.data;
    });
}