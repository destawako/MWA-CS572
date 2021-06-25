const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.courseGetAll = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("courses")
    .exec(function (err, student) {
      res.status(200).json(student.courses);
    });
};

module.exports.courseGetOne = function (req, res) {
  const courseCode = req.params.courseCode;
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("courses")
    .exec(function (err, course) {
      const courses = course.courses.id(courseCode);
      res.status(200).json(courses);
    });
};
