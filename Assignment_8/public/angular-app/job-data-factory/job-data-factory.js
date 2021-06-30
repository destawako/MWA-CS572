angular.module("jobSearchApp").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http) {
    return {
        alljobs: alljobs,
        getOneJob: getOneJob,
        deleteJob: deleteJob,
        addNewJob: addNewJob,
        updatethisJob: updatethisJob
    }

    function alljobs() {
        return $http.get("api/jobs").then(compelet).catch(failed);
    }

    function getOneJob(id) {
        return $http.get("/api/jobs/" + id).then(compelet).catch(failed);
    }

    function deleteJob(id) {
        return $http.delete("/api/jobs/" + id).then(compelet).catch(failed);
    }

    function addNewJob(job) {
        return $http.post("/api/jobs", job).then(compelet).catch(failed);

    }

    function updatethisJob(job, id) {
        console.log("factory:" + job)
        return $http.put("/api/jobs/" + id, job).then(compelet).catch(failed);

    }


    function compelet(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}