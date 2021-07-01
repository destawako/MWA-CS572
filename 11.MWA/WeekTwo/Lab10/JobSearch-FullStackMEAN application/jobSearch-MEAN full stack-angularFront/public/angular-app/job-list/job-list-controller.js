angular.module("job").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    var vm = this;
    vm.title = "List of All Jobs";
    vm.isSubmitted = false;

    JobDataFactory
    .getAllJobs()
    .then(function(response){
        vm.jobs = response
    });

     vm.addJob = function(){
         var postData = {
             title: vm.newJobTitle,
             salary: vm.newJobSalary,
             description: vm.newJobDescription,
             experience: vm.newJobExperience,
             skill1: vm.newJobSkills1,
             skill2: vm.newJobSkills2,
             postdate: vm.newJobPostDate
         };

         console.log("inside the controller add job")
         if(vm.jobForm.$valid){
             JobDataFactory.addOneJob(postData).then(function(response){
                 console.log("the job to be added is " + postData)
             }).catch(function(error){
                 console.log(error)
             })
             vm.isSubmitted = true;

         }else{
             vm.isSubmitted = true;
         }
     }

     vm.deleteOneJob = function(id){
         var jobId = id;

         JobDataFactory.deleteOneJob(id).then(function(response){
             console.log("delete Respones" + response)
         }).catch(function(err){
             console.log(err)
         })
     }
}