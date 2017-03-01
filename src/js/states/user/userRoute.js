angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('userLogin', {
    url: '/user/login',
    templateUrl: 'states/user/states/login/login.html',
    controller: 'UserLoginController',
  })
  .state('userLogout', {
    url: '/user/logout',
    templateUrl: 'states/user/states/logout/logout.html',
    controller: 'UserLogoutController',
  });
});