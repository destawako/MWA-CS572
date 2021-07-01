angular.module("meanGames").controller("LoginController", LoginController);

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
      console.log("------------")
    if (true) {
      var user = {
        username: vm.username,
        password: vm.password,
      };

      $http
        .post("/api/users/login", user)
        .then(function (response) {
          if (response.data.success) {
            $window.sessionStorage.token = response.data.token;
            console.log($window.sessionStorage.token + "sessioon");
            AuthFactory.isLoggedIn = true;
            var token = $window.sessionStorage.token;
            console.log(jwtHelper.decodeToken(token) + "hreee");
            var decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUser = decodedToken.username;
          }
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

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
