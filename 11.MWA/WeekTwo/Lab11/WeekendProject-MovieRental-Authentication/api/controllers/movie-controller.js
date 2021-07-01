const e = require("express");
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.getAllMovies = function(req, res){
    var offset = 2;
    var count = 9;

    const maxCount = 10;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);

        if(count > 7){
            count = 7;
        }
    }

    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({message:"QueryString and count should be Integers"});
        return;
    }

    if(count > maxCount){
        res.status(400).json({message:"Count should not exceed more than 7"})
        return;
    }

    Movie.find().skip(offset).limit(count)
    .exec(function(err, movies){
        const response = {
            status : 200,
            message : movies,
        };

        if(err){
            console.log("Error finding the movie");
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.getOneMovie = function(req, res){
    var movieId = req.params.movieId;

    console.log("Movie id is " + movieId);

    Movie.findById(movieId).exec(function(err, movie){
        const response = {
            status : 200,
            message : movie
        };

        if(err){
            response.status = 500;
            response.message = err
        }else if(!movie){
            response.status = 404,
            response.message = {message : "Movie Id is not found."};
        }

        res.status(response.status).json(response.message);

    });
}

module.exports.addOneMovie = function(req, res){

    Movie.create({
        title : req.body.title,
        year : req.body.year,
        genres : [req.body.genre1, req.body.genre2],
        duration : req.body.duration,
        releaseDate : req.body.releaseDate


    }, function(err, movie){
        const response = {
            status : 200,
            message : movie
        };

        if(err){
            response.status = 400,
            response.message = err
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.updateOneMovie = function(req, res){
    var movieId = req.params.movieId;
    Movie.findById(movieId).exec(function(err, movie){
        const response = {
            status : 204,
            message : movie
        };

        console.log(movie)

        if(err){
            response.status = 500,
            response.message = err
        }else if(!movieId){
            response.status = 404,
            response.message = {message:"Movie Id is not found in the database"};
        }

        if(response.status !==204){
            res.status(response.status).json({message:"Something wrong happened"})
        }else{
            movie.title = req.body.title;
            movie.genres = [req.body.genre1, req.body.genre2];
            movie.duration = req.body.duration;
            movie.year = parseInt(req.body.year);
            movie.releaseDate = Date.parse(req.body.releaseDate);
            console.log(movie)
            movie.save(function(err, updatedMovie){
                if(err){
                    response.status = 500,
                    response.message = err
                }else{
                    response.message = updatedMovie
                }

                res.status(response.status).json(response.message);
            })

        }

        res.status(response.status).json(response.message);
    })
}

module.exports.deleteOneMovie = function(req, res){
    var movieId = req.params.movieId;

    Movie.findByIdAndRemove(movieId).exec(function(err, deletedMovie){
        const response = {
            status : 204,
            message : deletedMovie
        };

        if(err){
            response.status = 500,
            response.message = err
        }else if(!movieId){
            response.status =404,
            response.message = ({message :"MovieId is not found"})
        }

        res.status(response.status).json(response.message);
    })


}