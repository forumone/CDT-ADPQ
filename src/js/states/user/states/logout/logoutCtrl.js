angular.module('f1CdtAdpq').controller('UserLogoutController', function(users, $state) {
  users.logOut()
  .finally(function() {
    $state.go('home');
  });
});
