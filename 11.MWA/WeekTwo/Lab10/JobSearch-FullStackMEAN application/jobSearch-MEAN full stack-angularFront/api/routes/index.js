var express = require("express");
var router = express.Router();
var jobSearchController = require("../controllers/jobsearch-controllers");
var locationController= require("../controllers/location-controller")

router.route("/api/jobs")
.get(jobSearchController.getAllJobs)
.post(jobSearchController.addJob);

router.route("/api/jobs/:jobId")
.get(jobSearchController.getOneJob)
.delete(jobSearchController.deleteOneJob)
.put(jobSearchController.updateOneJob)

router.route("/api/jobs/:jobId/locations")
.post(locationController.addLocation)
.get(locationController.getAllLocationsForAjob)
.delete(locationController.deleteOneLocation)
.put(locationController.updataLocation)

module.exports = router;