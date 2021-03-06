var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var fs = require('fs');

exports.getYouTubeAudio = function(videoId){
	return new Promise(function(resolve, reject){
      // Install youtube_dl locally: brew install youtube-dl
    youtube_dl = spawn('youtube-dl', ['--extract-audio', '--audio-format', 'mp3', '-o', (__base + '../videos/' + videoId + '.%(ext)s'), '--keep', "http://www.youtube.com/watch?v=" + videoId]);

    youtube_dl.stdout.on('data', function(data){
      console.log(data.toString());
    });

    youtube_dl.stderr.on('data', function(data){
      process.stderr.write(data);
    });

    // brew install ffmpeg
    youtube_dl.on('exit', function(){
      var mp3File = path.join(__base, '../videos/', videoId + '.mp3');
      var flacFile = path.join(__base, '../audios/', videoId + '.flac')
      ffmpeg(mp3File)
        .output(flacFile)
        .on('end', function(){
					fs.unlinkSync(mp3File);
          resolve();
        })
        .on('error', function(err){
          reject(err);
        })
        .run();
    });
  });
};
