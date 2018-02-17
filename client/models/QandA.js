angular.module('app')
  .factory('QandA', function () {
    // Constructor
    function QandA(question, answer, toneAnalysis, personalityAnalysis) {
      this.question = question || {};
      this.answer = answer || '';
      this.toneAnalysis = toneAnalysis || [];
      this.personalityAnalysis = personalityAnalysis || [];
    }

    // Constructor Methods
    QandA.prototype.setIntProp = (property, value) => {
      this[property] = value;
    };

    QandA.prototype.getProp = property => this[property];

    QandA.prototype.getInterview = () => this;

    return QandA;
  });
