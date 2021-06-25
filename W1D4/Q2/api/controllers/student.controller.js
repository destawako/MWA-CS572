const mongoose = require("mongoose");

const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  Student.find().exec(function (err, students) {
    console.log("Found students", students);
    res.status(200).json(students);
  });
};
// module.exports.studentsGetAll = function (req, res) {
//   Student.find().exec(function (err, students) {
//     console.log("Found students", students);
//     res.status(200).json(students);
//   });
// };

module.exports.studentGetOne = function (req, res) {
  console.log("GetOne request received");
  const studentId = req.params.studentId;
  console.log("studentId ", studentId);
  Student.findById(studentId).exec(function (err, student) {
    res.status(200).json(student);
  });
};
