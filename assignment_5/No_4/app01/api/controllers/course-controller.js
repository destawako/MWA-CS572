const mongoose = require("mongoose");
const Student = mongoose.model("Student");

var ObjectId= require("mongodb").ObjectId;

module.exports.addOnecourse = function(req, res){
    console.log("courses to add a Student");
    const studentId = req.params.studentId;
    if(req.body.name && req.body.code ){
        Student.findById(studentId).exec(function(err, student){
            const response =  {
                status : 204,
                message : student
            }
            if(err){
                response.status=400;
                response.message = err;
            } else if(!student){
                response.status=404;
                response.message = {"message": "Student ID not found"};
            } 
    
            //this means somethoing went wrong
            if(response.status != 204){
                res.status(response.status).json(response.message);
            }else{
                //we got a game, now we neet to update it
                console.log(student.course[0]);
                if(student.course[0] ==  ''  )
                    student.course = [{"name":req.body.name,"code":req.body.code}];
                else
                    student.course = student.course.concat([{"name":req.body.name,"code":req.body.code}]);
                
                
                // game.reviews.rating  = parseInt(req.body.rating);
                // game.reviews.review = req.body.review;
                console.log(response.status);
                console.log(req.body.name);
                console.log(student.course)
                student.save(function(err, updatecourse) {
                    response.message = updatecourse;
                    if(err){
                        console.log("500 error reached");
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
    
        });
    } else{
        console.log("Data missing from POST body");
        res.status(400).json({error:"Required data missing from POST"});
    }
}


// getting all the addresses from the DB
module.exports.getAllCourses = function(req,res){
    
    console.log("Gettinng One Students Addresses...");
    var studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err,courses){
        res.status(200).json(courses);
    });
}

module.exports.updateOneCourses = function(req, res){
    console.log("Getting one Address");
    var studentId = req.params.studentId;
    var courseId = req.params.courseId;
    var courses;
    console.log(courseId);

    Student.findById(studentId).exec(function(err,student){
        console.log(student);
        courses = student.courses.id(courseId);
        console.log(student);
        const response ={
            status:204,
            message:student
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!student || !courses){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Address or Student ID not found."};
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
            //we got a game, now we neet to update it
            console.log(student.name);
            course.name = req.body.name;
            course.code = req.body.code;
            
            student.save(function(err, updateStudent) {
                response.message = updateStudent;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
        
    });
}

module.exports.deleteOneCourses = function(req, res){
    console.log("Delleting one address");
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;

    Student.findById(studentId).exec(function(err,student){
       course = student.course.id(courseId);
        console.log(course);
        const response ={
            status:204,
            message:course
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!student || !course){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Student or Address ID not found."};
        }
        
        res.status(response.status).json(response.message);
        course.remove();
        student.save(function(err, updateStudent) {
            response.message = updateStudent;
        });   
        
    });
}

//getting one address from the DB
module.exports.getOnecourses = function (req, res) {
    var studentId = req.params.studentId;
    var courseId=req.params.courseId;
    console.log("GET addressId "+courseId+ " for Student "+studentId);
    Student.findById(studentId).select("addresses").exec(function (err, student) {
      console.log(student.courses);
      var address=student.courses.id(courseId);
        var response = {
        status: 200,
        message: course
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