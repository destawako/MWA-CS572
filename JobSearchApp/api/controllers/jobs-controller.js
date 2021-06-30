const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.jobsAddOne = function(req, res) {

    Job.create({
            title: req.body.title,
            salary: parseInt(req.body.salary),
            description: req.body.description,
            exprience: parseInt(req.body.exprience),
            skills: [],
            postDate: req.body.postDate,
            location: {}
        },
        function(err, job) {
            if (err) {
                console.log("Error creating jobs!");
                res.status(400).json(err);
            } else {
                console.log("Job is created!", job);
                res.status(201).json(job);
            }
        });
}

module.exports.jobsGetAll = function(req, res) {
    var offset = 0;
    var count = 20;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    };
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    };
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ message: "QueryString offset and count should be numbers" });
    }
    Job.find().skip(offset).limit(count).exec(function(err, jobs) {
        var response = { status: 200, message: jobs };
        if (err) {
            console.log("Err finding jobs");
            response.status = 500;
            response.message = err;
        } else {
            console.log("Found jobs", jobs.length);
            res.status(200).json(jobs);
        }
    });
};

module.exports.getOneJob = function(req, res) {
    var jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job) {

        var response = {
             status: 200,
              message: job
         };
        if (err) {
            response.status = 500;
            response.message - err;
        } else if (!job) {
            response.status = 404;
            response.message = "Resource is not found!";
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.jobDelete = function(req, res) {
    const jobId = req.params.jobId;
    Job.findByIdAndDelete(jobId).exec(function(err, deletedJob) {
        const response = { status: 204, message: deletedJob };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!deletedJob) {
            response.status = 404;
            response.message = "Job Id is not found!";
        }
        console.log("Job  deleted.");
        res.status(response.status).json(response.message);

    });
};

module.exports.jobUpdate = function(req, res) {

    var jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job) {
        var response = { status: 204, message: "" };
        if (err) {
            response.status = 400;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = "No Job Id found";
        }
        if (response.status != 204) {
            res.status(response.status).json(response.message);
        } else {
            job.title = req.body.title;
            job.salary = parseFloat(req.body.salary);
            job.description = req.body.description;
            job.exprience = parseFloat(req.body.exprience);
            job.save(function(err, job) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    console.log("Job saved.")
                }
            });
        }
        res.status(response.status).json(response.message);
    });
}