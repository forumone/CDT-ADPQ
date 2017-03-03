angular.module('f1CdtAdpq').controller('UserController', function($scope, parse, user, locations, notificationMethods, alertTypes) {
  $scope.user = user;
  $scope.locations = locations;
  $scope.canAddLocation = true;
  $scope.canEditUser = true;
  $scope.notificationMethods = notificationMethods;
  $scope.alertTypes = alertTypes;
  
  $scope.alerts = user.get('alerts').reduce(function(accu, alert) {
    accu[alert] = true;
    
    return accu;
  }, {});
  
  $scope.methods = user.get('methods').reduce(function(accu, method) {
    accu[method] = true;
    
    return accu;
  }, {});
  
  $scope.updateMethods = function(method) {
    var idx = user.get('methods').indexOf(method);
    
    if (idx === -1) {
      user.addUnique('methods', method);
    }
    else {
      user.remove('methods', method);
    }
    
    $scope.saveUser();
  };
  
  $scope.updateAlerts = function(alert) {
    
    var idx = user.get('alerts').indexOf(alert);
    
    if (idx === -1) {
      user.addUnique('alerts', alert);
    }
    else {
      user.remove('alerts', alert);
    }
    
    $scope.saveUser();
  };
  
  $scope.deleteLocation = function(location) {
    if (location.isNew()) {
      $scope.locations.pop();
      $scope.canAddLocation = true;
    }
    else {
      var idx = $scope.locations.indexOf(location);
      parse.destroy(location).then(function() {
        if (idx !== -1) {
          $scope.locations.splice(idx, 1);
        }
      });
    }
  }
  
  $scope.addLocation = function() {
    if ($scope.canAddLocation) {
      $scope.locations.push(new Parse.Object('Location'));
      $scope.canAddLocation = false;
    }
  }
  
  $scope.saveLocation = function(location) {
    $scope.canAddLocation = true;
  }

  $scope.saveUser = function() {
    if (user.dirty()) {
      $scope.canEditUser = false;
      parse.save(user).then(function() {
        $scope.canEditUser = true;
      });
    }
  }
});