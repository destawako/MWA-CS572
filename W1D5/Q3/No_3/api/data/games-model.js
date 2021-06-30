const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        "default": Date.now
    }
});

const gameSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:Number,
    designers:[String],
    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    minAge:{
        type:Number,
        min:0,
        max:200,
    },
    year:{
        type:Number,
        min:0
    },
   // publisher:publisherSchema
   reviews: [reviewSchema]
});

mongoose.model("Game",gameSchema,"games"); //Collection in MOngoDB is Games (compiling the document)