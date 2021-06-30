const { MongoNetworkError } = require("mongodb")
const mongoose = require("mongoose")
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        coordinates: {
            type: [Number]
        }
    }
})
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})
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
    minPlayers: {
        type: Number,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    minAge: {
        type: Number,
        required: true
    },
    designers: {
        type: [String],
        required: true
    },
    rate: {
        type: Number
    },
    publisher: publisherSchema,
    reviews: [reviewSchema]
})
mongoose.model("Game", gameSchema, "games")