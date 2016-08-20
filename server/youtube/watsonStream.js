var watson = require('watson-developer-cloud');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

var speech_to_text = watson.speech_to_text({
  username: __credentials.username,
  password: __credentials.password,
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
});

var watsonSpeechToText = function(audioFile, options) {
  return new Promise(function(resolve, reject) {
    var params = {
      content_type: options.content_type || 'audio/wav',
      timestamps: true,
      continuous: true,
      model: options.model || 'pt-BR_BroadbandModel',
      interim_results: true,
      word_confidence: true,
      max_alternatives: 3,
      inactivity_timeout: 600,
      word_alternatives_threshold: 1,
      keywords_threshold: options.threshold || 0.05,
      keywords: options.keywords
    };

    var results = [];
    var errors = [];

    // create the stream
    var recognizeStream = speech_to_text.createRecognizeStream(params);

    // pipe in some audio
    fs.createReadStream(audioFile).pipe(recognizeStream);

    // Pipe out the transcription to a file.
    // recognizeStream.pipe(fs.createWriteStream(__base + 'transcription.json'));

    // listen for 'data' events for just the final text
    // listen for 'results' events to get the raw JSON with interim results, timings, etc.

    recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

    recognizeStream.on('results', function(e) {
      if (e.results[0].final) {
        results.push(e);
      }
    });

    recognizeStream.on('error', function(err) {
      errors.push(err);
    });

    recognizeStream.on('close', function() {
      if(errors.length)
        return reject(errors);

      resolve(results);
    });
  });
};

module.exports = watsonSpeechToText;
