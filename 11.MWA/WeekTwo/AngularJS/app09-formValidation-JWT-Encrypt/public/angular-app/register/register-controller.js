angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController($http){
    var vm = this;
    vm.register = function(){}
         var user = {
            username: vm.username,
            password: vm.password,
            name: vm.name
         };
         if(!vm.username || vm.password){
             vm.err = "Please enter username and password"
         }else{
          if(vm.password !== vm.passwordRepeat){
              vm.err = "please make use its correct"
          }else{
              $http.post("/api/users/register", user).then(function(result){
                  console.log(result);
                  vm.message = "Succesful registered please log in"
                  vm.err = "";
              }).catch(function(err){
                  console.log(err);
              })
          }
         }
}