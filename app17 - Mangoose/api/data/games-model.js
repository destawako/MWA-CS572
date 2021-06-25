var mongoose= require("mongoose");
const gameSchema= mongoose.Schema({
    title : {
        type: String,
        require : true
    },
    price : Number,
    year : Number,
    minPlayers :{
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers:{
        type: Number,
        min: 1,
        max: 10
    },
    minAge:{
        type: Number,
        min: 4
    },
    rate : {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    designer: [String]

});

mongoose.model("Game",gameSchema)

// mongoose.model("Game",gameSchema, "games").......the 3rd parameter is optional, it is the name of the collection. otherwise it will declare it itself taking the plural of the schema which is "Game" -> games