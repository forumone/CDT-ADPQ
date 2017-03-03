angular.module('f1CdtAdpq').config(function($stateProvider) {
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'states/user/user.html',
    controller: 'UserController',
    resolve: {
      user: function(users) {
        return users.currentAsync(); 
      },
      locations: function(users, addresses) {
        return users.currentAsync().then(function(user) {
          return addresses.getUserLocations(user);
        });
      }
    }
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
  .state('userReset', {
    url: '/user/reset',
    templateUrl: 'states/user/states/reset/reset.html',
    controller: 'UserResetController',
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
  })
  .state('userAccount', {
    url: '/user/edit',
    templateUrl: 'states/user/states/account/account.html',
    controller: 'UserAccountController',
    resolve: {
      user: function(users) {
        return users.currentAsync(); 
      }
    }
  });
});
