angular.module("movieRental").controller("RegisterController",RegisterController);

function RegisterController($http){
    var vm = this;
    vm.register = function(){
        var user = {username: vm.username, password:vm.password};
        if(!vm.username || !vm.password) {
            vm.err = "Please add a user name and password";

        }else{
            if(vm.password !== vm.passwordRepeat){
              vm.err = "Please make sure passwords match"
            }else{
                console.log(user)
                $http.post("/api/users/register",user)
                .then(function(response){
                    console.log(response)
                    vm.message = "Successful registration, please login"
                    vm.err = "";
                }).catch(function(err){
                    console.log(err + "------")
                })
            }
        }
    }
}