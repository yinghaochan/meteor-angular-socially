Package.describe({
  name: 'socially-mobile',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('angular');

  api.addFiles([
    'client/lib/module.js',
    'client/routes.js',
    'client/users/controllers/login.js'
  ], 'web.cordova');

  api.addAssets([
    'client/users/views/login-mobile.html'
  ], 'web.cordova');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('socially-mobile');
});
