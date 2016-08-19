(function() {
  'use strict';

  angular
    .module('app.converter')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider
      .when('/converter', {
        templateUrl: 'app/converter/converter.html',
        controller: 'ConverterController',
        controllerAs: 'vm'
     });
   }
})();
