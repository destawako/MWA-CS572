const express = require("express");
const router = express.Router();

//importing both the controllers
const studentsControllers = require("../controllers/students-controller");
const courseControllers = require("../controllers/course-controller");

// getting all the students from the DB
router.route("/students")
    .get(studentsControllers.getAllStudents);

//getting a specific student from the DB
router.route("/students/:studentId")
    .get(studentsControllers.getOneStudent);

//getting all addresses of a specific student from the DB
router.route("/students/:studentId/addresses")
    .get(courseControllers.getAllCourses)
    .post(courseControllers.addOneCourse);

router.route("/students/:studentId/addresses/:addressId")
    .get(courseControllers.getOnecourses)
    .put(courseControllers.updateOneCourses)
    .delete(courseControllers.deleteOneCourse);


module.exports = router;