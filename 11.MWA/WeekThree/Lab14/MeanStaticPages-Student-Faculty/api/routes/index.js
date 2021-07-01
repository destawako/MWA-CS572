var express = require("express");
var router = express.Router();
const studentController = require("../controller/student-controller")
const facultyController = require("../controller/faculty-controller")




router.route("/attendance/students/index")
.get(studentController.studentsIndex)

router.route("/attendance/students/login")
.post(studentController.login)

router.route("/attendance/students/qrcode")
.get(studentController.qrcode)


//below three are for UI pupose only
router.route("/attendance/students/register")
.get(studentController.create)
router.route("/attendance/students/update")
.get(studentController.update)
router.route("/attendance/faculty/login")
.get(facultyController.login)
///


router.route("/attendance/students/qrcode")
.get(studentController.qrcode)

//
router.route("/attendance/students/get-all-students")
.get(studentController.getAllStudents)

router.route("/attendance/students/:id")
.put(studentController.update)
.delete(studentController.deleteStudent)

router.route("/students/getall/:id")
.get(studentController.getOneById)

//
router.route("/attendance/students/register")
.post(studentController.registerStudent)

//
router.route("/attendance/students")
.get(studentController.attendace)


router.route("/attendance/faculty/qrcode-camera")
.get(facultyController.qrCamera)

router.route("/students/courses")
.get(studentController.getAllCourses)
.post(studentController.addOneCourse)

router.route("/students/courses/:id")
.get(studentController.getCourseById)

router.route("/students/attendance")
.get(studentController.getAttendance)

module.exports=router;