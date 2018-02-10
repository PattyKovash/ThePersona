const Promise = require('bluebird');
const PersonalityInsightV3 = require('watson-developer-cloud/personality-insights/v3');

module.exports = function analyzePersonality (input) {
  return new Promise((resolve, reject) => {
    const personality = new PersonalityInsightV3({
      username: process.env.WATSON_PERSONALITY_USERNAME,
      password: process.env.WATSON_PERSONALITY_PASSWORD,
      version_date: '2017-10-13',
    });

    const params = {
      content: input,
      content_type: 'text/plain',
      consumption_preferences: true,
      raw_scores: true,
    };

    personality.profile(params, (err, personality) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.stringify(personality, null, 2));
      }
    });
  });
};
