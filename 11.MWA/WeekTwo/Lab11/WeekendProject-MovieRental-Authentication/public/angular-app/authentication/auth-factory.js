angular.module("movieRental").factory("AuthFactory", AuthFactory);

function AuthFactory(){
    return{
        auth: auth
    };
    
}

var auth = {ifLoggedId : false}