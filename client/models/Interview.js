angular.module('app')
  .factory('Interview', function () {
    // Interview Constructor
    function Interview(qAndA, videUrl, fullTranscript, overallTones, overallPersonality) {
      this.qAndA = fullTranscript || [];
      this.videoUrl = videUrl || '';
      this.fullTranscript = fullTranscript || '';
      this.overallTones = overallTones || [];
      this.overallPersonality = overallPersonality || [];
    }

    // Constructor Methods
    Interview.prototype.setIntProp = (property, value) => {
      this[property] = value;
    };

    Interview.prototype.getProp = property => this[property];

    Interview.prototype.getInterview = () => this;

    return Interview;
  });
