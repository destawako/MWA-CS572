angular.module("jobSearchApp").controller("JobSearchController", JobSearchController);

function JobSearchController(JobDataFactory, $routeParams) {
    var vm = this;
    vm.title = "Job Details";
    var id = $routeParams.id;
    JobDataFactory.getOneJob(id).then(function(response) {
        vm.job = response;
    });

    
}