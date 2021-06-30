var mongoose = require("mongoose");

var locationSchema = mongoose.Schema({
    state: String,
    city: String
})

var jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: Number,
    description: String,
    exprience: Number,
    skills: [String],
    postDate: Date,
    location: locationSchema
});

mongoose.model("Job", jobSchema, "jobs");