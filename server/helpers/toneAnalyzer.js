const Promise = require('bluebird');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

module.exports = function analyzeInput(input) {
  return new Promise((resolve, reject) => {
    const request = new ToneAnalyzerV3({
      username: '8448d3c1-987e-48bd-a702-fff765a595f6',
      password: 'hiBsoFiJmndX',
      version_date: '2017-09-21',
    });

    const params = {
      tone_input: input,
      content_type: 'text/plain',
      sentences: false,
    };

    request.tone(params, (err, tone) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.stringify(tone, null, 2));
      }
    });
  });
};
