'use strict';

angular.module('chatAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userList', {
        url: '/userList',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });