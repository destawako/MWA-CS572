const mongoose = require("mongoose");

const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  Student.find().exec(function (err, students) {
    console.log("Found students", students);
    res.status(200).json(students);
  });
};
module.exports.studentsGetAll = function (req, res) {
  Student.find().exec(function (err, students) {
    console.log("Found students", students);
    res.status(200).json(students);
  });
};

module.exports.studentGetOne = function (req, res) {
  console.log("GetOne request received");
  const studentId = req.params.studentId;
  console.log("studentId ", studentId);
  Student.findById(studentId).exec(function (err, student) {
    res.status(200).json(student);
    //added below
    module.exports.studentAddOne = function (req, res) {
      console.log("POST new Students");
      console.log(req.body);
      const newStudent = {
        name: req.body.name,
        gpa:parseFloat(req.body.gpa),
        age:parseInt(req.body.age),
        
        course:{}
      }
      Student.create(newStudent, function(err,student){
        const response = {
          status: 200,
          message: student,
        };
        if (err) {
          console.log("Error creating students");
          response.status = 500;
          response.message = err;
        } 
       
        res.status(response.status).json(response.message);
      }  
    )};
  });
};
module.exports.studentsDeleteOne = function (req, res) {
  console.log("DeleteOne request received");
  const studentId = req.params.studentId;
  Student.findByIdAndRemove(studentId).exec(function (err, deletedStudent) {
    const response = {
      status: 204,
      message: deletedStudent,
    };
    if (err) {
      console.log("Error finding Students");
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = { "message": "sudent ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};