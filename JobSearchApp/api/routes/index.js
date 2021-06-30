var express = require("express");
var router = express.Router();

var controllerJobs = require("../controllers/jobs-controller.js");
var controllerLocations = require("../controllers/locations-controller");
var controllerSkills = require("../controllers/skills-controller");

router.route("/jobs")
    .get(controllerJobs.jobsGetAll)
    .post(controllerJobs.jobsAddOne);

router.route("/jobs/:jobId")
    .get(controllerJobs.getOneJob)
    .delete(controllerJobs.jobDelete)
    .put(controllerJobs.jobUpdate);

router.route("/jobs/:jobId/locations")
    .post(controllerLocations.locationsAdd);

router.route("/jobs/:jobId/skills")
    .post(controllerSkills.skillAdd);

module.exports = router;