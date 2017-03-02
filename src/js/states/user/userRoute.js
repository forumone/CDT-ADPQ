angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('userRegister', {
    url: '/user/register',
    templateUrl: 'states/user/states/register/register.html',
    controller: 'UserRegisterController',
  });
});