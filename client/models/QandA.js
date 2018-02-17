angular.module('app')
  .factory('QandA', function () {
    // Constructor
    function Interview(question, answer, toneAnalysis, personalityAnalysis) {
      this.question = question || '';
      this.answer = answer || '';
      this.toneAnalysis = toneAnalysis || [];
      this.personalityAnalysis = personalityAnalysis || [];
    }

    // Constructor Methods
    Interview.prototype.setIntProp = (property, value) => {
      this[property] = value;
    };

    Interview.prototype.getProp = property => this[property];

    Interview.prototype.getInterview = () => this;

    return QandA;
  });
