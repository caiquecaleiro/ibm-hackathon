var express = require('express');

var watson = require(__base + 'youtube/watson');
var youtube = require(__base + 'youtube/youtube');
var path = require('path');
var fs = require('fs');

var router;
var speechRoute = function(router){
	this.router = router;
	setSpeechRoutes();
	return;
}

var setSpeechRoutes = function(){

	var speechStatus = "/status/:speechId";
	var speech = "/speech";
	var speechId = speech + "/:url";

	this.router.get(speechId, function(req, res){
    // return res.send('Done transcribing video id: ' + req.params.url);
		var message = 'GET in ' + speech + ' route';
		console.log(message);
		var file = [__base, '../audios/', req.params.url + '.flac'].join('');

		var goWatson = function() {
			watson(path.join(file), {keywords: ['presente']}, function(err, result) {
				return res.send(err || result);
			});
		}

		if (fs.existsSync(file)) {
			goWatson();
		} else {
			youtube.getYouTubeAudio(req.params.url).then(goWatson);
		}
  	// youtube.getYouTubeAudio(req.params.url)
    // .then(watson.watsonSpeechToText.bind(this, path.join(__base, 'file.flac')))
    // .then(function(){
    //   res.send('Done transcribing video id: ' + req.params.url);
    // });
	});

  this.router.post(speech, function(req, res){
    var message = 'POST in ' + speech + ' route';
    console.log(message);
    return res.send(message);
  });

	this.router.get(speechStatus, function(req, res) {
		return res.send('GET status of ID ' + req.params.speechId);
	});
}

module.exports = speechRoute;
