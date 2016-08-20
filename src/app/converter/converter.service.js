(function() {
  'use strict';

  angular
    .module('app.converter')
    .factory('converterService', converterService);

  converterService.$inject = ['$http', '$q'];

  function converterService($http, $q) {
    var service = {
      getKeywords: getKeywords
    };
    return service;

    function getKeywords(keywords) {
      var deferred = $q.defer();
      $http.post('http://10.1.37.151:8080/api/speech/' + 'Aula1', keywords)
        .success(function(data) {
          var keywords = [];
          for (var object in data) {
            data[object].forEach(function(word) {
              var keyword = new Keyword(
                word.normalized_text,
                word.start_time
              );
              keywords.push(keyword);
            });
          };
          deferred.resolve(keywords);
        })
        .catch(function(error) {
          console.log(error.data.message);
          return deferred.reject(error);
        });
        return deferred.promise;
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

    /**
     * A Keyword object.
     * @param`{String} description - The keyword description.
     * @param {Number} time - The time where this keyword appears in the video.
     * @constructor
     */
    function Keyword(description, time) {
      this.description = description;
      this.time = time;
    }
  }
})();
