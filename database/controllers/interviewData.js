const db = require('../../database');
const bluebird = require('bluebird');

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

exports.addAnswers = (intId, answerObj) => {
  return db.Answer.create({
    interviewId: intId,
    answer: answerObj.answer,
    toneAnalysis: answerObj.toneAnalysis,
    personalityAnalysis: answerObj.personalityAnalysis,
    wordAnalysis: answerObj.wordAnalysis,
    promptId: answerObj.question.id,
    userId: answerObj.userId
  });
};

exports.bulkAnswers = (intId, answers) => {
  return bluebird.mapSeries(answers, (answer) => {
    exports.addAnswers(intId, answer[1]);
  });
};
