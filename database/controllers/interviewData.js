const db = require('../../database');

exports.addInterview = (intObj) => {
  return db.Interview.create({
    fullTranscript: intObj.fullTranscript,
    videoUrl: intObj.videoUrl,
    overallTones: intObj.overallTones,
    overallPersonality: intObj.overallPersonality,
    overallWords: intObj.overallWords,
    userId: intObj.userId
  });
};
