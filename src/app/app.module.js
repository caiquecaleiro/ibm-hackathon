(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'app.landing',
      'app.converter'
    ])
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }
})();
