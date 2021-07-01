var mongoose= require("mogoose");

const courseSchema = new mongoose.Schema({
    coursename: String,
    coursecode : String
})

const attendanceSchema = new mongoose.Schema({
    studentid:{
        type:String,
        required:true,
        unique:true
    },

    lastname:{
        type: String
    },
    attendance:{
        type:Boolean,
        required:true
    },
    date:{
        type: Date,
    }
})

const qrSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }

})

const studentSchema = new mongoose.Schema({
    
    firstname:String,
    lastname: String,
    studentid:String,
    img: String,
    qr:qrSchema,
    attendance: [attendanceSchema],
    course: [courseSchema]
   
})