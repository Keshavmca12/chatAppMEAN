'use strict';
chatApp.config(function ($stateProvider) {
    $stateProvider
      .state('chatSession', {
        url: '/chatSession',
        templateUrl: 'app/message/chat.html',
         params : {sender: null, reciever:null},
        controller: 'MessageCtrl'
      });
  });