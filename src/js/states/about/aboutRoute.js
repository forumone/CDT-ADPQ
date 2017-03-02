angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  .state('about', {
    url : '/about',
    templateUrl : 'states/about/about.html',
    controller : 'AboutController',
  });
});