const Promise = require('bluebird');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

module.exports = function analyzeInput(input) {
  return new Promise((resolve, reject) => {
    const request = new ToneAnalyzerV3({
      username: process.env.WATSON_USERNAME,
      password: process.env.WATSON_PASSWORD,
      version_date: '2016-05-19',
    });

    if (input === '') {
      resolve(null);
    } else {
      const params = {
        tone_input: input,
        content_type: 'text/plain',
        sentences: false,
      };

      request.tone(params, (err, tone) => {
        if (err) {
          reject(err);
        } else {
          resolve(tone);
        }
      });
    }
  });
};
