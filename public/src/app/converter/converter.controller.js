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
    vm.setCurrentTime = setCurrentTime;

    createVideos();

    function submitAction(url, keywords) {

      keywords = keywords.replace(/\s*,\s*/g, ',');
      var json = {
        'keywords': keywords.split(',')
      };
      json = JSON.stringify(json);
      createKeywords(json);
    }

    function setCurrentTime(id, time) {
      var vid = document.getElementById(id);
      vid.currentTime = time -1 > 0 ? time -1 :  time;
    }

    function createKeywords(keywords) {
      vm.videos.forEach(function(video) {
        video.isLoading = true;
        video.keywords = [];
        converterService.getKeywords(keywords, video.id)
          .then(function(data) {
            video.isLoading = false;
            video.loaded = true;
            video.keywords = data;
          }, function(error) {
            console.log(error);
          });
      });
    }

    function createVideos() {
      converterService.getVideos()
        .then(function(data) {
          vm.videos = data;
        });
    }
  }
})();
