(function() {
  'use strict';

  angular
    .module('app.converter')
    .controller('ConverterController', ConverterController);

  ConverterController.$inject = ['converterService'];

  function ConverterController(converterService) {
    var vm = this;
    vm.submitAction = submitAction;
    vm.url = '';
    vm.keyword = '';
    vm.videos = [];
    vm.keywords = [];

    function submitAction(url, keywords) {
      keywords = keywords.replace(/\s*,\s*/g, ',');
      var json = {
        'keywords': keywords.split(',')
      };
      json = JSON.stringify(json);
      createKeywords(json);
    }

    function createKeywords(keywords) {
      converterService.getKeywords(keywords)
        .then(function(data) {
          vm.keywords = data;
        });
      // var vid = document.getElementById("myVideo");
      // vid.currentTime = 5;
    }
  }
})();
