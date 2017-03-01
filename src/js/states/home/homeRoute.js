angular.module('f1CdtAdpq').config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url : '/',
    templateUrl : 'states/home/home.html',
    controller : 'HomeController',
  });
});