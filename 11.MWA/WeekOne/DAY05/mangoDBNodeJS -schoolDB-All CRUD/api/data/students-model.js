var mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street:{
        type:String,
        required:true,
    
    },
    city: {
        type: String,
        required: true,

    },
     zip: {
         type: Number,
         required: true,
     },
     location: {
        type: String,
        required: true,
         
     }
});
const studentSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     gpa: { 
         type : Number,
         required: false

     }
     
    //  address: [addressSchema]
        
});

mongoose.model("Student", studentSchema, "Students");  