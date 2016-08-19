var watson = require('watson-developer-cloud');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

var speech_to_text = watson.speech_to_text({
  username: "0a211962-7ee3-4097-8641-64ad86518b94",
  password: "Zxnm0BDDJ6fZ",
  version: 'v1',
  model_id: 'pt-BR_BroadbandModel',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
});

function Recognize(audioFile, options, callback) {
  var params = {
    audio: fs.createReadStream(audioFile),
    'content_type': 'audio/flac',
    model: options.model || 'pt-BR_BroadbandModel',
    'interim_results': true,
    'continuous': true,
    'word_confidence': true,
    'timestamps': true,
    'max_alternatives': 3,
    'inactivity_timeout': 600,
    'word_alternatives_threshold': 0.05,
    'keywords_threshold': options.threshold || 0.05,
    'keywords': options.keywords || ['']
  };

  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      return callback(error);
    else
      return callback(null, transcript)
  });
};

module.exports = Recognize;

// var watsonSpeechToText = function(audioFile) {
//
//   return new Promise(function(resolve, reject) {
//
//     var params = {
//       content_type: 'audio/flac',
//       timestamps: true,
//       continuous: true,
//       model: 'pt-BR_BroadbandModel'
//     };
//
//     var results = [];
//
//     var util = {
//       handleError: function(message, err) {
//         console.log(message);
//       }
//     }
//
//     // create the stream
//     var recognizeStream = speech_to_text.createRecognizeStream(params);
//
//     // pipe in some audio
//     fs.createReadStream(audioFile).pipe(recognizeStream);
//
//     // Pipe out the transcription to a file.
//     recognizeStream.pipe(fs.createWriteStream(__base + 'transcription.txt'));
//
//     // listen for 'data' events for just the final text
//     // listen for 'results' events to get the raw JSON with interim results, timings, etc.
//
//     recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events
//
//     recognizeStream.on('results', function(e) {
//       if (e.results[0].final) {
//         results.push(e);
//       }
//     });
//
//     // ['data', 'results', 'error', 'connection-close'].forEach(function(eventName) {
//     //   recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
//     // });
//
//     recognizeStream.on('data', function(data) {
//       console.log('data');
//       console.log(data);
//     });
//
//     recognizeStream.on('results', function(results) {
//       console.log('results');
//       console.log(results.results[0].alternatives);
//     });
//
//     recognizeStream.on('error', function(err) {
//       console.error(err);
//       util.handleError('Error writing to transcript.json: ' + err);
//     });
//
//     recognizeStream.on('connection-close', function() {
//       console.log('Connection close');
//     	var transcriptFile = path.join(__base, 'transcript.json');
//
//       fs.writeFile(transcriptFile, JSON.stringify(results), function(err) {
//         if (err) {
//           console.error(err);
//           util.handleError(err);
//         }
//         console.log(results[0].alternatives);
//         resolve();
//       });
//     });
//   });
// };

// var Recognize = function(file) {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       audio: fs.createReadStream(file),
//       'content_type': 'audio/flac',
//       model: 'pt-BR_BroadbandModel',
//       'interim_results': true,
//       'continuous': true,
//       'word_confidence': true,
//       'timestamps': true,
//       'max_alternatives': 3,
//       'inactivity_timeout': 600,
//       'word_alternatives_threshold': 0.001,
//       // 'keywords_threshold': 0.001,
//       // 'keywords': ['presente'],
//       'smart_formatting': true
//     };
//
//     speech_to_text.recognize(params, function(error, transcript) {
//       if (error) {
//         console.log('error:', error);
//         reject(error);
//       }
//       else
//         resolve();
//     });
//   });
// };

// exports.watsonSpeechToText;
// exports.Recognize;
// module.exports = {recognize: Recognize};
