angular.module('socially.mobile').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/packages/socially-mobile/client/users/views/login-mobile.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  });
}]);