angular.module('app')
  .factory('QandA', function () {
    // Constructor
    function QandA(question, answer, toneAnalysis, personalityAnalysis, wordAnalysis) {
      this.question = question || {};
      this.answer = answer || '';
      this.toneAnalysis = toneAnalysis || [];
      this.personalityAnalysis = personalityAnalysis || [];
      this.wordAnalysis = wordAnalysis || [];
    }

    // Constructor Methods
    QandA.prototype.setIntProp = (property, value) => {
      this[property] = value;
    };

    QandA.prototype.getProp = property => this[property];

    QandA.prototype.getInterview = () => this;

    return QandA;
  });
