angular.module('f1CdtAdpq').controller('HomeController', function($scope, $rootScope, $state, users) {
  $scope.login = function() {
    users.logOut().then(function() {
      return users.logIn($scope.email, $scope.password);
    })
    .then(function() {
      $rootScope.$broadcast('userLoggedIn');
      
      $scope.messages = [];
      $state.go('user');
    })
    .catch(function(err) {
      console.log(err);
    });
  };
});