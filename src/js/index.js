var app = angular.module('f1CdtAdpq', ['ngRoute', 'ui.router', 'config']);
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
})
.run(function($rootScope, $state, $location, parseApplicationId, parseJavascriptKey, serverUrl) {
 Parse.initialize(parseApplicationId, parseJavascriptKey);

 Parse.serverURL = serverUrl;
  
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    var redirect = (angular.isDefined(toParams.redirect) && toParams.redirect) ? toParams.redirect : encodeURIComponent($location.url());
    
    $state.go('userLogin', {redirect: redirect});
    // this is required if you want to prevent the $UrlRouter
    // reverting the URL to the previous valid location
    event.preventDefault();
  });
});
