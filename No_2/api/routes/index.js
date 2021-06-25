const express = require("express");
const router = express.Router();

//importing both the controllers
const studentsControllers = require("../controllers/students-controller");
const courseControllers = require("../controllers/course-controller");

// getting all the students from the DB
router.route("/students").get(studentsControllers.getAllStudents);

//getting a specific student from the DB
router.route("/students/:studentId").get(studentsControllers.getOneStudent);

//getting all addresses of a specific student from the DB
router.route("/students/:studentId/course").get(studentsControllers.getAllCoures);

//getting one Address
router.route("/students/:studentId/course/:courseId").get(studentsControllers.courseGetOne)
module.exports = router;