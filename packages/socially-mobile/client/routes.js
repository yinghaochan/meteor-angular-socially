angular.module('socially.mobile').config(function($stateProvider) {
  $stateProvider.state('socially.login', {
    url: '/login',
    views: {
      main: {
        templateUrl: '/packages/socially-mobile/client/users/views/login-mobile.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc'
      }
    }
  })
    .state('socially', {
      url: '/socially',
      templateUrl: '/packages/socially-mobile/client/mobile-main.html',
      abstract: true
    })
    .state('socially.parties', {
      url: '/parties',
      views: {
        main: {
          templateUrl: '/packages/socially-mobile/client/parties/views/parties-list.html',
          controller: 'PartiesListCtrl'
        }
      }
    });
});