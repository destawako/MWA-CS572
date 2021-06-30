const express = require("express");
const controllerStudent = require("../controllers/student.controller");
const controllerCourse = require("../controllers/course.controller");

const router = express.Router();

router.route("/students").get(controllerStudent.studentsGetAll);

router.route("/students/:studentId").get(controllerStudent.studentGetOne);
router.route("/students/:studentId/courses").get(controllerCourse.courseGetAll);
router.route("/students/:studentId/courses/:courseCode").get(controllerCourse.courseGetOne);
router.route("/students").post(controllerStudent.studentGetOne);

router.route("/students/:studentId")
//.get(controllerStudent.studentsGetOne)
//.put(controllerStudent.studentsFullUpdateOne)
//.patch(controllerStudent.studentsPartialUpdateOne)
.delete(controllerStudent.studentsDeleteOne);


module.exports = router;
