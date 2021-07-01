const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({

    _id :{

        type: ObjectId
    },
    lat: {
        type: Number
    },
     
    lng : {
        type: Number
    }
});


const jobsearchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },

    salary : {
        type: Number,
        required: false
    },

    description: {
        type: String,
    },
    experience : {
        type: String
    },
    postdate: {
        type: Date
    },
    skills:{
        type: [String]
    },

    location: locationSchema



});

mongoose.model("Job", jobsearchSchema, "jobs");
