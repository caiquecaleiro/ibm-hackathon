var express = require('express');

var SpeechRoute = require(__base + 'routes/speechRoute');

var LoadRoutes = function(){

	router = express.Router();

	new SpeechRoute(router);
	return router;
}

module.exports = LoadRoutes;
