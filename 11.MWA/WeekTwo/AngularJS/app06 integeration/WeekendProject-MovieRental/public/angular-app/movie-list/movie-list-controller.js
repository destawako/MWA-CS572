angular.module("movieRental").controller("MoviesController", MoviesController);

function MoviesController(MovieDataFactory){
    var vm = this;
    vm.title = "MEAN Movies App";

    MovieDataFactory.getAllMovies()
        .then(function(response){
            vm.movies = response;
        });

        vm.addMovie = function(){
            var postData = {
                title: vm.newMovieTitle,
                year: vm.newMovieYear,
                genre: vm.newMovieGenre,
                duration: vm.newMovieDuration,
                releaseDate:vm.newMovieReleaseDate,
            
            };
            console.log("inside the controller");

            if(vm.movieForm.$valid){
                MovieDataFactory.addOneMovie(postData).then(function(response){
                    console.log("movies")
                }).catch(function(error){
                    console.log(error);
                });

            }else{
                vm.isSubmitted = true;

                }
                   
                
            }

            vm.deleteMovie = function(id){
                var movieId = id;
                MovieDataFactory.deleteOneMovie(movieId).then(function(response){
                    console.log("Movie deleted");
                }).catch(function(error){
                    console.log(error)
                })
            }
        }