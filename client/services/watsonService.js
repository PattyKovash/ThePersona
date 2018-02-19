angular.module('app')
  .service('watsonService', function ($http, broadcastService, interviewService) {
    this.responses = [];
    this.answerAnalysis = [];
    this.answerFillers = [];
    this.interviewAnalysis = [];
    this.interviewFillers = [];
    this.interviewService = interviewService;

    this.analyzeAnswer = (answer, promptID) => {
      this.responses.push(answer);
      return this.toneAnalysis(answer)
        .then((results) => {
          const data = results.data;
          console.log('INSIDE ANALYSE ANSWER: ', answer);
          if (data) {
            this.interviewService.updateEachAnswer(promptID, answer, 'toneAnalysis', data.document_tone);
            this.answerAnalysis.push(results.data.document_tone);
          } else {
            this.answerAnalysis.push('');
          }
        })
        .then(() => {
          return this.wordAnalysis(answer)
            .then((wordResults) => {
              this.interviewService.updateEachAnswer(promptID, answer, 'wordAnalysis', wordResults.data);
              this.answerFillers.push(wordResults.data);
            });
        })
        .catch((err) => {
          console.log('ERROR IN ANALYZE ANSWER: ', err);
          return err;
        });
    };

    this.analyzeInterview = (interview, promptID) => {
      console.log('FULL INTERVIEW: ', interview);
      return this.toneAnalysis(interview, promptID)
        .then((results) => {
          const data = results.data;
          if (data) {
            this.interviewService.updateOverall(interview, 'overallTones', data.document_tone);
            this.interviewAnalysis.push(results.data.document_tone);
            console.log('Overall interview analysis:', this.interviewAnalysis);
          } else {
            this.interviewAnalysis.push('');
          }
        })
        .then(() => {
          return this.wordAnalysis(interview)
            .then((wordResults) => {
              this.interviewService.updateOverall(null, 'overallWords', wordResults.data);
              this.answerFillers.push(wordResults.data);
            });
        })
        .then(() => {
          console.log('FINAL INT OBJ', this.interviewService.curInt);
          broadcastService.send('analysis Done');
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
