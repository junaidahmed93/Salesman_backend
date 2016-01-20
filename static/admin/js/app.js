angular.module('starter', ['ionic'])
  .config(function($stateProvider, $urlRouterProvider,$httpProvider ){
    
    
    $stateProvider
      .state("login", {
        url : "/login",
        templateUrl : "/admin/templates/login.html",
        controller  : "loginCtrl" 
      })
      .state("signup", {
        url : "/signup",
        templateUrl : "/admin/templates/signup.html",
        controller  : "signupCtrl" 
      })
      .state("home", {
        url : "/",
        templateUrl : "/admin/templates/home.html",
        controller  : "homeCtrl",
        loginCompulsory : true
      });
      
      
      $urlRouterProvider.otherwise("/");
      
      
      //$httpProvider.interceptors.push('httpInterceptor');
  })
  .run(function($rootScope, $state){
    
    $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
        
      if(toState.loginCompulsory && !firebaseLocalToken){ 
        event.preventDefault();
        $state.go("login");
      }
        
    });
    
  })