angular.module("myProperApp").controller("AnimeController", AnimeController);

function AnimeController($http){
    var vm = this;
    $http.get("https://raw.githubusercontent.com/asarode/anime-list/master/data/data.json").then(function(response){
        vm.animes = response.data;
    })
}

