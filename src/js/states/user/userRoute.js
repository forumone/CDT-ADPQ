angular.module('f1CdtAdpq').config(function($stateProvider) {
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'states/user/user.html',
    controller: 'UserController'
  })
  .state('userRegister', {
    url: '/user/register',
    templateUrl: 'states/user/states/register/register.html',
    controller: 'UserRegisterController'
  })
  .state('userLogout', {
    url: '/user/logout',
    templateUrl: 'states/user/states/logout/logout.html',
    controller: 'UserLogoutController',
  });
});
