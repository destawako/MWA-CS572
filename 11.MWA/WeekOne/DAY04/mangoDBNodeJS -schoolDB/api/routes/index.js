var express = require("express");
var router = express.Router();
var studentcontrollers =require("../controllers/students-controllers");
const controllerAddress = require("../controllers/address-controller");

router.route("/api/students")
.get(studentcontrollers.getAllStudents)
.post(studentcontrollers.addOneStudent);

router.route("/api/students/:studentId")
.get(studentcontrollers.getOneStudent)
.delete(studentcontrollers.deleteOneStudent);

router.route("/api/students/:studentId/addresses")
.get(controllerAddress.addressesGetAll)
.post(controllerAddress.addressAddOne);

router.route("/api/students/:studentId/addresses/:addressId")
.get(controllerAddress.addressGetOne)
.put(controllerAddress.updateOneAddress)
.delete(controllerAddress.addressDeleteOne);
module.exports=router;