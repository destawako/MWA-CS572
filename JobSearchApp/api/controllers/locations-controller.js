const mongoose = require("mongoose");
const Job = mongoose.model("Job");

var _addLocation = function(req, res, job) {
    job.location.state = req.body.state;
    job.location.city = req.body.city;
    job.save(function(err, updateJob) {
        var response = { status: 200, message: updateJob };
        if (err) {
            response.status = 500;
            response.message = err;
        } else
            res.status(response.status).json(response.message);
    });
};

module.exports.locationsAdd = function(req, res) {

    var jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job) {
        var response = { status: 200, message: job };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!job) {
            console.log("Job Id not found in database ");
            response.status = 404;
            response.message = "Job Id not found";
        }
        if (job) {
            _addLocation(req, res, job);
        } else {
            res.status(response.status).json(response.message);
        }
    });
};