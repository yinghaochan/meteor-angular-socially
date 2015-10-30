angular.module('socially.browser').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/packages/socially-browser/client/users/views/login-browser.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  });
}]);