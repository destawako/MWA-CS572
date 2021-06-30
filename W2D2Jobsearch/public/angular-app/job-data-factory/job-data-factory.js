angular.module("jobSearchApp").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http) {
    return {
        alljobs: alljobs,
        getOneJob: getOneJob,
        
    }

    function alljobs() {
        return $http.get("api/jobs").then(compelet).catch(failed);
    }

    function getOneJob(id) {
        return $http.get("/api/jobs/" + id).then(compelet).catch(failed);
    }


    function compelet(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}