angular.module('f1CdtAdpq').controller('UserAccountController', function($scope, $state, notificationMethods, alertTypes, user, users, parse) {
  $scope.editUser = parse.getValueObject(user);
  
  $scope.save = function() {
    user.set($scope.editUser);
    
    parse.save(user).then(function() {
      /*
       * When the password is reset it resets the session token as well.
       * If we're updating the current user and changing the password we
       * need to log out the user and then log them in again to regenerate
       * the session.
       */
      if (user.isCurrent() && $scope.password_1 && $scope.password_1.length) {
        users.logOut().then(function() {
          return users.logIn(user.get('username'), $scope.password_1);
        })
        .then(function() {
          $state.go('user');
        });
      }
      else {
        $state.go('user');
      }
    });
  };
});