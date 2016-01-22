var companyName;
angular.module('starter')
    .controller("loginCtrl",function($scope,$state,$http){
        $scope.user = {};
        $scope.doLogin = function(){
          $http.post("/api/login",{data : $scope.user})
            .success(function(response){
                if(response.token){
                localStorage.setItem('token',response.token);
                localStorage.setItem('company',response.company);
               // console.log(response);
               companyName =response.company;
               console.log(companyName)
                $state.go("home");
                }
                
            })
             .error(function(err){
                 console.log(err);
             }); 
        };
    })
    
    .controller("signupCtrl",function($scope,$state,$http){
        $scope.user = {};
        $scope.signupUser = function(){
            $http.post('/api/signup',{data : $scope.user})
                   .success(function(response){
                       console.log(response);
                   })
                   
                   .error(function(err){
                       console.log(err);
                   });
        };
    })
    
    
    
    .controller("homeCtrl",function($scope,$state,$http){
        $scope.Alluser = [];
      
        $http.get('/api/salesman')
        .success(function(response){
            console.log(response.userAll);
            $scope.Alluser = response.userAll;
           
        })
        .error(function(err){
            
        })
       // console.log("home");
    })
    
    .controller('signupSalesCtrl',function($scope,$state,$http){
        $scope.sales = {};
       console.log("I am sales Signup");
      // console.log(companyName);
      $scope.sales.Admin= companyName;
        
        $scope.signupSales = function(){
           // $scope.sales.Admin = companyName;
            $http.post('/api/signupsales',{data : $scope.sales})
                   .success(function(response){
                       console.log(response);
                       
                       $state.go("home");
                   })
                   
                   .error(function(err){
                       console.log(err);
                   });
        };
    });