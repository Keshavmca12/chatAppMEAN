'use strict';
chatApp.controller('MessageCtrl', function ($scope, $http, socket,$stateParams) {
 $scope.messagesList = [];
 $scope.message={};
 $scope.sender=$stateParams.sender;
 $scope.reciever=$stateParams.reciever;
 var chatSessionId='';

 var getChatSessionId=function(senderId,recieverId){
   if(chatSessionId==''){
    if(senderId>recieverId){
      chatSessionId=recieverId+'_'+senderId;
    }else{
      chatSessionId=senderId+'_'+recieverId;
    }
  }
  return chatSessionId;
};

$scope.sendMessage = function(text) {
  $scope.submitted = true;
  if(text==''){
    return;
  }
  $scope.message.text=text;
  $scope.message.sender  =$scope.sender._id;
  $scope.message.reciever  =$scope.reciever._id;
  $scope.message.isSeen  =-1;
  $scope.message.chatSessionId =getChatSessionId($scope.sender.id,$scope.reciever.id);
  console.log("chat session id "+$scope.message.chatSessionId);
  $http.post('/api/messages/send', {message:$scope.message})
  .then(function(res){
    $scope.message = {};
  });
};
$scope.deleteMessage=function(msg){
  $http.delete('/api/messages/' + msg._id);
};
console.log("$scope.sender._id  :"+$scope.sender.id  +"   $scope.reciever._id"+$scope.reciever.id);
$http.post('/api/messages/',{ chatSessionId: getChatSessionId($scope.sender.id,$scope.reciever.id)}).success(function(messages) {
  console.log("messages",messages);
  $scope.messagesList = messages;
  socket.syncUpdates('message', $scope.messagesList);
});

$scope.getUserClass = function(id) {
     // console.log("id"+id);
   //   console.log("reciever"+reciever._id);
   var classes = {
    'color-green': $scope.sender._id==id,
    'color-red': $scope.reciever._id==id
  };
  //  console.log("classess  :",classes);
  return classes;
};

});
