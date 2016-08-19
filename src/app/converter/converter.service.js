(function() {
  'use strict';

  angular
    .module('app.converter')
    .factory('converterService', converterService);

  converterService.$inject = ['$http'];

  function converterService($http) {
    var service = {
      getData: getData
    };
    return service;

    function getData() {
      // Return the json
    }
  }
})();
