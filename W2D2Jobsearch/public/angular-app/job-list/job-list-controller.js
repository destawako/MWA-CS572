angular.module("jobSearchApp").controller("JobsController", JobsController);

function JobsController(JobDataFactory) {
    var vm = this;
    vm.title = "Job Search App";

    JobDataFactory.alljobs().then(function(response) {
        vm.jobs = response;
    })

    vm.addJob = function() {
        var postData = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            exprience: vm.newJobExprience
        };
        JobDataFactory.addNewJob(postData).then(function(response) {
            console.log("Job Saved");
        });

    }
};