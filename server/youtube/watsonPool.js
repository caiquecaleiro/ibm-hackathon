var WatsonPool = function WatsonPool(){
	var pool = {};
  var jobsId = 0;

  this.startRecognize = function(file, keywords) {

    // speech_to_text.recognize(params, function(error, transcript) {
    //   if (error)
    //     console.log('error:', error);
    //   else
    //     console.log(JSON.stringify(transcript, null, 2));
    // });

    // pool[jobsId++] =
  }

  this.getStatus = function(jobId) {
    return pool[jobId];
  }
};

WatsonPool.instance = null;
WatsonPool.getInstance = function(){
  if(this.instance === null){
      this.instance = new WatsonPool();
  }
  return this.instance;
}

module.exports = WatsonPool.getInstance();
