// angular.module("meanGames")
//   .controller("GamesController", GamesSearchController);

// function GamesSearchController(GamessDataFactory) {
//   const vm = this;

//   vm.name = "mean game Search App";

//   vm.search = function () {
//     console.log("search received");
//     // console.log("title : " + vm.title);
//     console.log(" front end title type: " + typeof vm.title);
//     GamesDataFactory.searchJob(vm.title)
//       .then(function (response) {
//         console.log("Search found");
//         vm.jobs = response;
//         console.log(vm.jobs);
//         // vm.stars = _getStarsArray(vm.game.rate);
//       })
//       .catch(function (error) {
//         console.log("Error while searching ", error);
//       });
//   };

  // JobsDataFactory.getOne(jobId).then(function (response) {
  //   vm.job = response;
  //   // vm.stars = _getStarsArray(vm.game.rate);
  // });
// }
