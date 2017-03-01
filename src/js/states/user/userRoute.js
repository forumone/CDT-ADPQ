angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('userReset', {
    url: '/user/reset',
    templateUrl: 'states/user/states/reset/reset.html',
    controller: 'UserResetController',
  });
});