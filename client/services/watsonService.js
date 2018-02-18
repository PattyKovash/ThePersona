angular.module('app')
  .service('watsonService', function ($http, broadcastService) {
    this.responses = [];
    this.answerAnalysis = [];
    this.answerFillers = [];
    this.interviewAnalysis = [];
    this.interviewFillers = [];

    this.analyzeAnswer = (answer, promptID) => {
      this.responses.push(answer);
      return this.toneAnalysis(answer)
        .then((results) => {
          if (results.data) {
            broadcastService.send('toneAnalysis', {
              analysis: results.data.document_tone,
              promptID: promptID
            });
            this.answerAnalysis.push(results.data.document_tone);
          } else {
            this.answerAnalysis.push('');
          }

          this.wordAnalysis(answer)
            .then((wordResults) => {
              this.answerFillers.push(wordResults.data);
              broadcastService.send('wordAnalysis', {
                analysis: wordResults.data,
                promptID: promptID
              });
            });
        })
        .catch((err) => {
          console.log('ERROR IN ANALYZE ANSWER: ', err);
          return err;
        });
    };

    this.analyzeInterview = (interview, promptID) => {
      return this.toneAnalysis(interview, promptID)
        .then((results) => {
          if (results.data) {
            broadcastService.send('overallTones', {
              analysis: results.data.document_tone,
              promptID: promptID
            });
            this.interviewAnalysis.push(results.data.document_tone);
            console.log('Overall interview analysis:', this.interviewAnalysis);
          } else {
            this.interviewAnalysis.push('');
          }

          this.wordAnalysis(interview)
            .then((wordResults) => {
              this.answerFillers.push(wordResults.data);
              broadcastService.send('overallWords', {
                analysis: wordResults.data,
                promptID: promptID
              });
              broadcastService.send('analysis Done');
            });
        })
        .catch((err) => {
          console.log('ERROR IN ANALYZE ANSWER: ', err);
          return err;
        });
    };

    this.toneAnalysis = (transcription) => {
      return $http.post('/api/ibmtone', {
        data: {
          text: transcription,
        }
      });
    };

    this.wordAnalysis = (transcription) => {
      return $http.post('/api/wordanalysis', {
        data: {
          text: transcription
        }
      });
    };
  });
