var express = require('express');

var SpeechRoute = require(__base + 'routes/speechRoute');
var VideosRoute = require(__base + 'routes/videosRoute');

var LoadRoutes = function(){

	router = express.Router();

	new SpeechRoute(router);
	new VideosRoute(router);
	return router;
}

module.exports = LoadRoutes;
