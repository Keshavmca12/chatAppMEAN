'use strict';

chatApp.controller('LoginCtrl', function ($scope, $http, socket , $state,$rootScope) {
  $scope.user= {};
  $scope.user.userName='';
  $scope.user.password='';
  $scope.login=function(){
    if($scope.user.userName=='' || $scope.user.password==''){
      alert("all fields are required");
      return;
    }
    $http.post('/api/user/login/', { userName: $scope.user.userName,password :$scope.user.password}).success(function(users) {
      console.log("usres",users);
      if(users.length>0){
        socket.syncUpdates('users', $scope.users);
        $rootScope.activeUser=users;
     //   console.log("$rootScope.activeUser",$rootScope.activeUser[0]);
        $state.go('userList');
      }else{
       $scope.user= {};
       $scope.user.userName='';
       $scope.user.password='';
       alert("invalid username and password");
     }

   });
  };
  
});

