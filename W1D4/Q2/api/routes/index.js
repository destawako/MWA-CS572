const express = require("express");
const controllerStudent = require("../controllers/student.controller");
const controllerCourse = require("../controllers/course.controller");

const router = express.Router();

router.route("/students").get(controllerStudent.studentsGetAll);

router.route("/students/:studentId").get(controllerStudent.studentGetOne);
router.route("/students/:studentId/courses").get(controllerCourse.courseGetAll);
router.route("/students/:studentId/courses/:courseCode") .get(controllerCourse.courseGetOne);
module.exports = router;
