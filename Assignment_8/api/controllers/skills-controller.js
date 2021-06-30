var mongoose = require("mongoose");
var Job = mongoose.model("Job");


var _addSkills = function(req, res, job) {

    job.skills.push(req.body.skills);
    job.save(function(err, jobskill) {
        var response = { status: 200, message: jobskill };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};


module.exports.skillAdd = function(req, res) {
    var jobId = req.params.jobId;

    Job.findById(jobId).exec(function(err, job) {
        var response = {
            status: 200,
            message: job
        };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!job) {
            console.log("Job id not found in database ", id);
            response.status = 404;
            response.message = { "message": "Job Id not found" + jobId };
        }
        if (job) {
            _addSkills(req, res, job);
        } else {
            res.status(response.status).json(response.message);
        }
    });
};