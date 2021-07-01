angular.module("movieRental").controller("LoginController", LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;
  vm.isLoggedIn = function () {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function () {
    console.log( "------------ token-----");
    if (true) {
        // console.log(response.data.token + "------------ token");
      var user = {
        username: vm.username,
        password: vm.password,
      };
      $http
        .post("/users/login", user)
        .then(function (response) {
          if (response.data.success) {
            console.log(response.data.token + "------------ token");
            $window.sessionStorage.token = response.data.token;
            AuthFactory.isLoggedIn = true;
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUser = decodedToken.username;
            console.log(vm.loggedInUser + "---");
          }
        })

        .catch(function (err) {
          console.log(err);
        });
    }

    // AuthFactory.isLoggedIn = true;
  };

  vm.logout = function () {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };

  vm.isActiveTab = function (url) {
    var currentPath = $location.path().split("/")[1];
    return url === currentPath ? "active" : "";
  };
}
