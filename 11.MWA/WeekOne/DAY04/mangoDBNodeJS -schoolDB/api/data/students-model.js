var mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street:{
        type:String,
        required:false,
    
    },
    city: {
        type: String,
        required: false,

    },
     zip: {
         type: Number,
         required: false,
     },
     location: {
        type: String,
        required: false,
         
     }
});
const studentSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     gpa: Number,
     
     address: [addressSchema]
        
});

mongoose.model("Student", studentSchema, "Students");  