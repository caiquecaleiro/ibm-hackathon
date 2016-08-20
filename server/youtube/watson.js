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
    interim_results: true,
    continuous: true,
    word_confidence: true,
    timestamps: true,
    max_alternatives: 3,
    inactivity_timeout: 600,
    word_alternatives_threshold: 0.001,
    keywords_threshold: options.threshold || 0.05,
    // 'word_alternatives_keywords': options.keywords,
    keywords: options.keywords,
    smart_formatting: true
  };

  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      return callback(error);
    else
      return callback(null, transcript)
  });
};

module.exports = Recognize;
// module.exports = watsonSpeechToText;

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
