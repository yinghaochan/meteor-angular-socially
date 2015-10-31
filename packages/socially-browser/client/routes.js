angular.module('socially.browser').config(function ($stateProvider) {
  $stateProvider
    .state('socially.login', {
      url: '/login',
      views: {
        main: {
          templateUrl: '/packages/socially-browser/client/users/views/login-browser.html',
          controller: 'LoginCtrl',
          controllerAs: 'lc'
        }
      }
    })
    .state('socially', {
      url: '/socially',
      templateUrl: '/packages/socially-browser/client/browser-main.html',
      abstract: true
    })
    .state('socially.parties', {
      url: '/parties',
      views: {
        main: {
          templateUrl: '/packages/socially-browser/client/parties/views/parties-list.html',
          controller: 'PartiesListCtrl'
        }
      }
    });
});