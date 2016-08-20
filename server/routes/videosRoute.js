var fs = require('fs');

var router;
var videosRoute = function(router){
	this.router = router;
	setVideosRoutes();
	return;
}

var setVideosRoutes = function(){
  this.router.get('/videos', function(req, res) {
		var response = [];
    fs.readdirSync(__base + '../videos/')
			.filter(file => file.split('.')[1] === 'mp4') //only mp4 video format
			.forEach(file => response.push({path: "/videos/" + file, id: file.split('.')[0]}));
    res.send(response);
  });
};

module.exports = videosRoute;
