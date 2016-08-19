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

    function submitAction(url, keywords) {
      console.log(keywords.split(','));
      createVideos();
    }

    function createVideos(data) {
      //Test
      var video = new Video('https://www.youtube.com/',
        'test1',
        'http://i.ytimg.com/vi/ZKOtE9DOwGE/mqdefault.jpg',
        '3:00');
      vm.videos.push(video);
      //
      // converterService.getData()
      //   .then(function(data) {
      //     console.log(data);
      //   });
      // vm.videos = null;
      // data.foreach(function(object) {
      //   var video = new Video(
      //     data.url,
      //     data.title,
      //     data.image,
      //     data.time
      //   );
      //   vm.videos.push(video);
      //});
    }

    /**
     * A Video object.
     * @param {String} url - The video URL.
     * @param {String} title - The video title.
     * @param {String} image - The image link.
     * @param {String} time - The video total time.
     * @constructor
    */
    function Video(url, title, image, time) {
      this.url = url;
      this.title = title;
      this.image = image;
      this.time = time;
    }
  }
})();