(function() {
  'use strict';

  angular
    .module('app.converter')
    .factory('converterService', converterService);

  converterService.$inject = ['$http', '$q'];

  function converterService($http, $q) {
    var service = {
      getKeywords: getKeywords,
      getVideos: getVideos
    };
    return service;

    function getKeywords(keywords, video) {
      var deferred = $q.defer();
      $http.post('http://10.1.37.151:8080/api/speech/' + video, keywords)
        .then(function(data) {
          var dt = data.data;
          if(JSON.stringify(dt) === JSON.stringify({}))
            deferred.resolve([]);
          var keywords = [];
          for (var object in dt) {
            dt[object].forEach(function(word) {
              var keyword = new Keyword(
                word.normalized_text,
                word.start_time
              );
              keywords.push(keyword);
            });
          }
          deferred.resolve(keywords);
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function getVideos() {
      var deferred = $q.defer();
      var videos = [];
      $http.get('http://10.1.37.151:8080/api/videos')
        .then(function(response) {
          response.data.forEach(function(object) {
            var video = new Video(
              object.id,
              object.path,
              object.id
            );
            videos.push(video);
          });
          deferred.resolve(videos);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /**
     * A Video object.
     * @param {String} id - The video id.
     * @param {String} url - The video URL.
     * @param {String} time - The video total time.
     * @constructor
     */
    function Video(id, url, title) {
      this.id = id;
      this.url = url;
      this.title = title;
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
