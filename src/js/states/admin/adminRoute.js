angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: 'states/admin/admin.html',
    controller: 'AdminController',
  })
  .state('adminNotification', {
    url: '/admin/notification',
    templateUrl: 'states/admin/states/notification/notification.html',
    controller: 'AdminNotificationController',
  });
});