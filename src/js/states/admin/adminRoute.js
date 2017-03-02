angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('adminReport', {
    url : '/admin/report',
    templateUrl : 'states/admin/states/report/report.html',
    controller : 'AdminReportController',
  });
});