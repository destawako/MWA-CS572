const express = require("express");
const mongoose = require("mongoose");
const JobSearch = mongoose.model("Job");

module.exports.addJob = function(req, res){

    console.log(req.body)
    JobSearch.create({
        title: req.body.title,
        salary: parseInt(req.body.salary),
        description: req.body.description,
        experience: req.body.experience,
        postdate: Date.parse(req.body.postdate),
        skills: [req.body.skill1, req.body.skill2],
        location: {}
    }, function(err, job){
        const response = {
            status: 200,
            message: job
        };

        if(err){
            response.status = 500;
            response.message = err
        }
        
        res.status(response.status).json(response.message);
    })
}

module.exports.getAllJobs = function(req, res){
    var offset = 0;
    var count = 4;

    var countMax = 10;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }


    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);

        if(count > 7){
            count =7;
        }
    }

    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({message : "must be a number"})
        return;
    }

    if(count>countMax){
        res.status(400).json({message: "must not exceed 10"})
        return;
    }

    JobSearch.find().skip(offset).limit(count).exec(function(err, jobs){
        const response = {
            status : 200,
            message : jobs
        };

        if(err){
            response.status = 500;
            response.message = err
        }

        res.status(response.status).json(response.message);
    });


}

module.exports.getOneJob = function(req, res){
    var jobId = req.params.jobId;

    JobSearch.findById(jobId).exec(function(err, job){
        console.log(job)
        const response = {
            status : 200,
            message : job
        }

        if(err){
            response.status = 500,
            response.message = err
        }else if(!job){
            response.status = 404,
            response.message = {message: "GameId not found"}
        }

        res.status(response.status).json(response.message);
    })
}

module.exports.deleteOneJob = function(req,res){
    var jobId = req.params.jobId;

    JobSearch.findByIdAndRemove(jobId).exec(function(err, deletedJob){
        const response = {
            status : 200,
            message : deletedJob
        }

        if(err){
            response.status = 500,
            response.message = err
        }

        res.status(response.status).json(response.message);
    })


}

module.exports.updateOneJob = function(req, res){
    var jobId = req.params.jobId;
    JobSearch.findById(jobId).exec(function(err, job){
        const response = {
            status : 200,
            message : job
        }

        if(err){
            response.status = 500,
            response.message = err
        }else if(!job){
            response.status =404,
            response.message = {message :"id not found"}
        }else{

            job.title = req.body.title,
            job.salary = parseInt(req.body.salary),
            job.description = req.body.description,
            job.experience = req.body.experience,
            job.postdate = Date.parse(req.body.postdate)

            console.log(job);
            job.save(function(err, savedGame){
                if(err){
                    response.status= 500,
                    response.message = err
                }

                res.status(response.status).json(response.message);
            })
        }

    })
}


