angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('adminNotification', {
    url: '/admin/notification',
    templateUrl: 'states/admin/states/notification/notification.html',
    controller: 'AdminNotificationController',
  });
});