
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

var ObjectId= require("mongodb").ObjectId;


// getting all the students from the DB
module.exports.getAllStudents = function(req,res){
    console.log("Get all Students...");

    var offset=0;
    var count=10;
    const maxCount = 7;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }

    // Type Checking
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message":"Query String off set and count should be numbers."});
        return;
    }
    // Limit Checking
    if(count >maxCount){
        res.status(400).json({"message":"Count exceeds maximum number of "+maxCount});
        return;
    }

    //Using Mongoose
    Student.find().skip(offset).limit(count).exec(function(err,students){
        if(err){
            console.log("Err finding Students...");
            res.status(500).json(err);
        }else{
            console.log("Found Students..",students.length);
            res.status(200).json(students);
        }
    });


}

//getting one Student from the DB
module.exports.getOneStudent = function(req,res){
    console.log("Getting one Student..");
    var studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err,student){

        const response ={
            status:200,
            message:student
        };
        
        if(err){
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!student){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Student ID not found."};
        }
        res.status(response.status).json(response.message);
        
    });
}

// getting all the addresses from the DB
module.exports.getAllCoures = function(req,res){
    
    console.log("Gettinng One Students course...");
    var studentId = req.params.studentId;
    Student.findById(studentId).select("course").exec(function(err,course){
        res.status(200).json(course);
    });
}

//getting one course from the DB
module.exports.courseGetOne = function (req, res) {
    var studentId = req.params.studentId;
    var courseId=req.params.courseId;
    console.log("GET CourseId "+courseId+ " for Student "+studentId);
    Student.findById(studentId).select("course").exec(function (err, course) {
      console.log(course);
      var course=course.course.id(courseId);
        var response = {
        status: 200,
        message: course,
      };
      if (err) {
        console.log("Error finding address");
        response.status = 500;
        response.message = err;
      } else if (!course) {
        response.status = 404;
        response.message = { message: "course ID not foud" };
      }
      res.status(response.status).json(response.message);
    });
  };

