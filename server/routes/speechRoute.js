var express = require('express');

var watson = require(__base + 'youtube/watson');
var watsonStream = require(__base + 'youtube/watsonStream');
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

	this.router.post(speechId, function(req, res){
		var file = [__base, '../audios/', req.params.url + '.wav'].join('');
		var fileFlac = [__base, '../audios/', req.params.url + '.flac'].join('');

		var jsonFile = path.join(__base, '../audios/', req.params.url + '.json');

		if(!req.body.keywords || !req.body.keywords.length) {
				return res.status(400).send({message: 'É necessário informar palavras chaves'});
		}

		var prepareResult = function(results) {
			var compound = {};
			results.filter(result => {
				var compare = () => req.body.keywords.some(k => result.results[0].keywords_result[k]);
				return JSON.stringify(result.results[0].keywords_result) !==  JSON.stringify({}) && compare();
			})
			.map(key => key.results[0].keywords_result)
			.forEach(f => {
				for(var at in f) {
					compound[at] = compound[at] || [];
					f[at].forEach(y => compound[at].push(y));
				}
			});
			return res.send(compound);
		}

		function goWatson() {
			try {
				watsonStream(path.join(file), req.body).then(prepareResult, (err) => res.status(500).send(err));
			} catch (e) {
				return res.status(500).send(e);
			}
		}
		if(fs.existsSync(file)) {
			goWatson();
		} else if (fs.existsSync(fileFlac)) {
			req.body.content_type = "audio/flac";
			file = fileFlac;
			goWatson();
		} else {
			req.body.content_type = "audio/flac";
			file = fileFlac;
			youtube.getYouTubeAudio(req.params.url).then(goWatson);
		}
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
