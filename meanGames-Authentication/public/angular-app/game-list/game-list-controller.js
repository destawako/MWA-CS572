angular.module("meanGames").controller("GamesController", GamesController);

function GamesController($route, GameDataFactory, AuthFactory){
    var vm = this;
    vm.title = "MEAN Games App";
    vm.isSubmitted = false;

    GameDataFactory.getAllGames()
        .then(function(response){
            vm.games = response;
        });

        vm.addGame = function(){
            var postData = {
                title: vm.newGameTitle,
                price: vm.newGamePrice,
                year: vm.newGameYear,
                rate: vm.newGameRating,
                minPlayers: vm.newGameMinPlayers,
                maxPlayers:vm.newGameMaxPlayers,
                minAge:vm.newGameMinAge,
                designer: vm.newGameDesigner
            };
            console.log("inside the controller");

            if(vm.gameForm.$valid){
                GameDataFactory.addOneGame(postData).then(function(response){
                    console.log("Game")
                }).catch(function(error){
                    console.log(error);
                });

            }else{
                vm.isSubmitted = true;

                }
            }

            vm.deleteGame = function(id){
                var gameId = id;
                GameDataFactory.deleteOneGame(gameId).then(function(response){
                    console.log(response);
                }).catch(function(error){
                    console.log(error)
                })
            }

            vm.isLoggedIn = function(){
                if(AuthFactory.isLoggedIn){
                    return true;
                }else{
                    return false;
                }
            }
        }

        
