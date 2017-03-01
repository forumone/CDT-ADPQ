angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('example', {
    url : '/example',
    templateUrl : 'states/example/example.html',
    controller : 'ExampleController',
  });
});