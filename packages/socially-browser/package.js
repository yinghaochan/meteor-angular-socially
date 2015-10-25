Package.describe({
  name: 'socially-browser',
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
    'client/routes.js'
  ], 'web.browser');

  api.addAssets([
    'client/users/views/login-browser.html'
  ], 'web.browser');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('socially-mobile');
});
