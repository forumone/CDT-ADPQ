angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'states/user/user.html',
    controller: 'UserController',
  })
  .state('userLogin', {
    url: '/user/login',
    controller: 'UserLoginController',
  })
  .state('userLogout', {
    url: '/user/logout',
    templateUrl: 'states/user/states/logout/logout.html',
    controller: 'UserLogoutController',
  })
  .state('userRegister', {
    url: '/user/register',
    templateUrl: 'states/user/states/register/register.html',
    controller: 'UserRegisterController',
  });
});
