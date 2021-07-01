var express = require("express");
var router = express.Router();
var studentcontrollers =require("../controllers/students-controllers");
const controllerPublisher = require("../controllers/address-controller");

router.route("/api/students")
.get(studentcontrollers.getAllStudents)
.post(studentcontrollers.addOneStudent);

router.route("/api/students/:studentId")
.get(studentcontrollers.getOneStudent)
.delete(studentcontrollers.deleteOneStudent)
.put(studentcontrollers.updateOneStudent);

router.route("/api/students/:studentId/addresses").get(controllerPublisher.addressesGetAll);
router.route("/api/students/:studentId/addresses/:addressId").get(controllerPublisher.addressGetOne);
module.exports=router;