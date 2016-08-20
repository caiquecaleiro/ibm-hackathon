(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'app.landing',
      'app.converter'
    ])
    .constant('SERVER', {
      url: window.location.origin
    })
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }
})();
