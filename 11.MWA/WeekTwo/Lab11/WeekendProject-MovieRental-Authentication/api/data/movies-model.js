const { ObjectID } = require("mongodb");
var mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    id : {
        type: ObjectID
    },

    name : {
        type :String,
        required:false
    },

    age : {
        type: Number,
        required:false
    },
    bornin : {
        type:String,
        required:false
    },
    awards : {
        type:String,
        required:false
    },
    education : {
        type : String,
        required:false
    }
});

const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required : false
    },

    year : {
        type: Number,
        required:false
    },

    genres : {
        type : [String],
        required: false
    },

    duration : {
        type : String,
        required: false
    },

    releaseDate : {
        type : Date,
        required :false
    },

    // actors : [actorSchema]
})


mongoose.model("Movie", movieSchema, "comingMovies");