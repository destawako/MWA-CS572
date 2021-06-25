const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        required:true
    }

});

const studentSchema = new mongoose.Schema({
    name:String,
    gpa:Number
});

mongoose.model("Student",studentSchema,"Students");