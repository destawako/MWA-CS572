const e = require("express");
var express = require("express");
const { ReadPreference } = require("mongodb");
var mongoose = require("mongoose");
const { report } = require("../routes");
var JobSearch = mongoose.model("Job");


var _addLocation = function(req,res,job){

    job.location.lat = parseFloat(req.body.lat);
    console.log(job.location.lat)

    job.location.lng = parseFloat(req.body.lng);

    job.save(function(err, savedLocation){
        const response = {
            status: 200,
            message: savedLocation
        }
        if(err){
            response.status = 500,
            response.message = err
        }

        res.status(response.status).json(response.messagee);
    })

}
module.exports.addLocation = function(req, res){
    var jobId = req.params.jobId;

    JobSearch.findById(jobId).exec(function(err, job){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            response.status = 500,
            response.message = err
        }else if(!job){
            response.status = 404,
            response.message = {message :"id not found"}
        }
        if(job.location == null){
            job.location = {}
        }
        if(job){
            console.log(job)
            _addLocation(req, res, job);
        }else{
            res.status(response.status).Json(response.message);
        }
    })

}

module.exports.getAllLocationsForAjob = function(req, res){
    var jobId = req.params.jobId;

    JobSearch.findById(jobId).exec(function(err, location){
        const response = {
            status: 200,
            message: location.location
        }
        if(err){
            response.status = 500,
            response.message = err
        }else if(!location){
            response.status = 404,
            response.message = {message :"id not found"}
        }else{
            res.status(response.status).json(response.message);
        }
    })
}

var _deleteJob = function(req,res,job){

    job.location.remove();
    job.save(function(err,deletedJob){
        const response = {
            status : 200,
            message: deletedJob
        }
        if(err){
            response.status = 500,
            response.message = err
        }
            res.status(response.status).json(response.message);
        
    })
}


module.exports.deleteOneLocation = function(req, res){
    var jobId = req.params.jobId;

    JobSearch.findById(jobId).exec(function(err, job){

        const response = {
            status: 200,
            message: job
        }
        if(err){
            response.status = 500,
            response.message = err
        }else if(!job){
            response.status = 404,
            response.message = {message:"id not found"}
        }else if(job){
            _deleteJob(req,res,job);
        }
        

        res.status(response.status).json(response.message);
    })
}

var _updateLocation = function(req, res, job){

    job.location.lat = parseFloat(req.body.lat);
    job.location.lng = parseFloat(req.body.lng);
    console.log(job.location.lat +"   "+ job.location.lng)

    job.save(function(err,updatedJob){
        const response = {
            status : 200,
            message: updatedJob
        }
        if(err){
            response.status = 500,
            response.message = err
        }
            // res.status(response.status).json(response.message);
    })
}


module.exports.updataLocation = function(req, res){
    var jobId = req.params.jobId;

    JobSearch.findById(jobId).exec(function(err, job){

        const response = {
            status: 200,
            message: job
        }
        if(err){
            response.status = 500,
            response.message = err
        }else if(!job){
            response.status = 404,
            response.message = {message:"id not found"}
        }else if(job){
            _updateLocation(req,res,job);
        }
        

        res.status(response.status).json(response.message);
    })


}


