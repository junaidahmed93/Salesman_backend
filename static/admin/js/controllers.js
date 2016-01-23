var companyName;
var abcd;
var Allusers = {};
 angular.module('starter')

    // .service("salesUserRetrive" , function($http , $q){
    //     //var Alluser = [];
    //     var q = $q.defer();
    //   this._salesUserfunc = function(){
    //     $http.get('/api/salesman')
    //     .success(function(response){
    //         console.log(response.userAll);
    //         Allusers = response.userAll;
    //         //return Allusers;
    //         q.resolve(Allusers);
            
    //     })
    //     .error(function(err){
    //         q.reject();
    //     })
    //     }              
    //     return q.promise;
               
    //       })
          .factory("myfactory" , function($http,$q){
              return{
                  salesusers: function(){
                      var q = $q.defer();
                      $http.get('/api/salesman')
                        .success(function(response){
                            console.log(response.userAll);
                            Allusers = response.userAll;
                            q.resolve(response);
                        })
                        
                        .error(function(err){
                            q.reject(err);
                        })
                        return q.promise;
                  } 
              }
          })

     .controller("dashboardCtrl", function($scope , myfactory){
        $scope.Alluser = [];
                $scope.displayCompanyName = companyName;
             
           
                 myfactory.salesusers()
                    .then(function(res){
                    $scope.Alluser = res.userAll;
                    })
            
       console.log("hello yes");
       console.log($scope.Alluser);
      
     
    })
    
    .controller("loginCtrl",function($scope,$state,$http , myfactory){
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
                $state.go("dashboard");
                
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
                       
                       $state.go("dashboard");
                   })
                   
                   .error(function(err){
                       console.log(err);
                   });
        };
    })
    .controller('homeCtrl',function($scope){
        console.log("run");
    })
    .controller("DoughnutCtrl", function ($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [30, 500, 100];
  //$scope.colours = ["Red" , "Yellow" , "Green"];
  Chart.defaults.global.colours = [ "Yellow" , "Red" , "Green"];
});