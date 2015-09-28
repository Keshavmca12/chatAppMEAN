'use strict';

chatApp.controller('RegisterCntrl', function($scope, $state,$http,socket) {
  $scope.user={};
  $scope.submitDetails=function(user){
    alert("user"+user.firstName);
    $http.post('/api/user/register', { user: $scope.user}).then(function(res){
     // socket.syncUpdates('user', $scope.user);
      $scope.user = {};
      $state.go("userList");
    });
  }
});
