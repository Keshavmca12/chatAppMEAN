'use strict';

chatApp.controller('UserCtrl', function ($scope, $http, socket , $state,$rootScope) {
  $scope.users = [];
  $scope.isSendeActivated=false; 
  if(angular.isUndefined($rootScope.activeUser)){
    $state.go('login');
    return;
  }
  $scope.activeUser=$rootScope.activeUser[0];
 //  console.log("$scope.activeUser",$scope.activeUser.id);

 $http.get('/api/user/getUsersList').success(function(users) {
  console.log("usres",users);
  $scope.users = users;
  socket.syncUpdates('users', $scope.users);
});

 $scope.activateSender=function(user){
  //   $scope.activeUser=user;
  $scope.isSendeActivated=true; 
};


$scope.deleteThing = function(user) {
  $http.delete('/api/users/' + user._id);
};
$scope.openChat=function(reciever){
  $state.go('chatSession', {sender:$scope.activeUser,reciever:reciever} )
};

});

