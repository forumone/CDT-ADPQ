angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('userEdit', {
    url: '/user/edit',
    templateUrl: 'states/user/states/edit/edit.html',
    controller: 'UserEditController',
  });
});