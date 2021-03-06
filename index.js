'use strict';
global.__base = __dirname + '/server/';
global.__credentials = {};

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

__credentials = JSON.parse(fs.readFileSync('credentials.json'));
if(!__credentials.username || !__credentials.password) {
  throw new Error("Missing IBM bluemix credential");
}

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

//Necessary headers to clients access.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', express.static('public/src'));
app.use('/videos', express.static('videos'));

var LoadRouter = require(__base + 'routes/loadRoutes');
app.use('/api', new LoadRouter());

var httpPort = 8080;
http.createServer(app).listen(httpPort, function(){
  console.log("HTTP server listening on port %s", httpPort);
});
