angular.module("jobSearchApp", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("")
    $routeProvider
        .when("/", {
            templateUrl: "angular-app/job-list/jobs.html",
            controller: "JobsController",
            controllerAs: "vm"
        }).when("/jobs/:id", {
            templateUrl: "angular-app/job-display/job.html",
            controller: "JobSearchController",
            controllerAs: "vm"
        }).when("/job/:id", {
            templateUrl: "angular-app/job-update/jobUpdate.html",
            controller: "JobSearchController",
            controllerAs: "vm"
        }).when("/test", {
            templateUrl: "angular-app/test/test.html",
            controller: "testController",
            controllerAs: "vm"

        });
}