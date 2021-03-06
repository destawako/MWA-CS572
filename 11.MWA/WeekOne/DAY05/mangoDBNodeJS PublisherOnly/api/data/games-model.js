const { ObjectID } = require("mongodb");
var mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({


    name:{
        type:String,
        required:false,
    
    },
    country: {
        type: String,
        required: false,

    },
     established: {
         type: Date,
         required: false,
     },
     location: {
         address: String,
         coordinates:{
             type: [Number], // long (E/W), lat(N/S)
             indexes: "2dsphere" //this will take the earth curvature into consideration
         }
     }
});
const gameSchema = new mongoose.Schema({
     title: {
         type: String,
         required: true
     },
     year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    //  designers: [String],

     minPlayers: {
         type: Number,
         min: 1,
         max: 10
     },
     maxPlayers: {
        type: Number,
        min: 1,
        max: 10
     },
     rate: {
         type: Number,
         min: 1,
         max: 5,
         "default": 1 
     },
    

     publisher: publisherSchema
        
});

//adding review schema

mongoose.model("Game", gameSchema, "games");  //if not provided then MongoDB name is Games