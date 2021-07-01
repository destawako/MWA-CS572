angular.module("job").controller("JobController", JobController);

function JobController($routeParams, JobDataFactory){
    var vm = this;
    vm.title = "This is display page"
    var id = $routeParams.id;
    console.log("=======its here")
    JobDataFactory.getOneJob(id)
    .then(function(response){
        console.log(response)
        vm.job = response;
    })

    

}