angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'states/user/user.html',
    controller: 'UserController',
  });
});