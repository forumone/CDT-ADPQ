angular.module('f1CdtAdpq').controller('UserRegisterController', function($scope, notificationMethods, alertTypes, users, parse) {
  $scope.alertTypes = alertTypes;
  $scope.notificationMethods = notificationMethods;
  $scope.newUser = {};
  $scope.alerts = {};
  $scope.methods = {};
  
  $scope.register = function() {
    users.logOut().then(function() {
      var saveUser = angular.copy($scope.newUser);
      var username = saveUser.email;
      saveUser.methods = Object.keys($scope.methods).reduce(function (accu, value) {
        if ($scope.methods[value] === true) {
          accu.push(value);
        }
        return accu;
      },[]);
      
      saveUser.alerts = Object.keys($scope.alerts).reduce(function (accu, value) {
        if ($scope.alerts[value] === true) {
          accu.push(value);
        }
        return accu;
      },[]);
      
      return users.signUp(username, $scope.password_1, saveUser);
    })
    .then(function(user) {
      var location = new Parse.Object('Location');
      location.set('user', user);
      location.set('point', new Parse.GeoPoint($scope.place.geometry.location.lat(), $scope.place.geometry.location.lng()));
      location.set('location', $scope.place.formatted_address);
      
      return parse.save(location);
    })
    .then(function() {
      $rootScope.$broadcast('userLoggedIn');
      
      $state.go('user');
    })
    .catch(function(err) {
      
    });
  };
});