angular.module('starter')
    .controller("loginCtrl",function($scope,$state,$http){
        $scope.user = {};
        $scope.doLogin = function(){
          $http.post("/api/login",{data : $scope.user})
            .success(function(response){
                if(response.token){
                localStorage.setItem('token',response.token)
                localStorage.setItem('OwnerEmail', $scope.user.email )
                console.log(response);
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
       // var localName = localStorage.getItem('OwnerEmail');
       // $http.post('/api/salesman',{data:localName});
        $http.get('/api/salesman')
        .success(function(response){
            console.log(response.userAll);
            $scope.Alluser = response.userAll;
        })
        .error(function(err){
            
        })
       // console.log("home");
    })