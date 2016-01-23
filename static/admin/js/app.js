var app = angular.module('starter', ['ionic' ,"chart.js"]);
  app.config(function($stateProvider, $urlRouterProvider,$httpProvider ){
    
    
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
      .state("signupSales", {
        url : "/signupsales",
        templateUrl : "/admin/templates/signupSales.html",
        controller  : "signupSalesCtrl" 
      })
      .state("home", {
        url : "/home",
        templateUrl : "/admin/templates/home.html",
        controller  : "homeCtrl",
        loginCompulsory : true
        
      })
      .state("dashboard", {
        url : "/dashboard",
        templateUrl : "/admin/templates/dashboard.html",
        controller  : "dashboardCtrl",
        loginCompulsory : true
      });
      
      
      $urlRouterProvider.otherwise("/home");
      
      
      //$httpProvider.interceptors.push('httpInterceptor');
  });
  app.run(function($rootScope, $state){
    
    $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
        
      if(toState.loginCompulsory && !firebaseLocalToken){ 
        event.preventDefault();
        $state.go("home");
      }
        
    });
    
  });