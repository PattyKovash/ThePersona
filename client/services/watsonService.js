angular.module('app')
  .service('watsonService', function ($http, broadcastService) {
    this.responses = [];
    this.answerAnalysis = [];
    this.answerFillers = [];
    this.interviewAnalysis = [];
    this.interviewFillers = [];


    this.analyzeAnswer = (answer, promptID, cb) => {
      this.responses.push(answer);
      this.toneAnalysis(answer, (err, results) => {
        if (err) {
          console.log(err);
          this.answerAnalysis.push('');
        }
        this.answerAnalysis.push(results);
        if (cb) {
          cb(err, results);
        }
        console.log('tone anaylsis:', this.answerAnalysis);
      });

      this.wordAnalysis(answer, (err, results) => {
        if (err) { console.log(err); }
        this.answerFillers.push(results);
      });
    };

    this.analyzeInterview = (interview, promptID) => {
      this.toneAnalysis(interview, null, true, (err, results) => {
        if (err) {
          console.log('ERROR:', err);
          this.interviewAnalysis.push('');
        }
        this.interviewAnalysis.push(results);
        console.log('Overall interview analysis:', this.interviewAnalysis);
        broadcastService.send('analysis Done');
      });

      this.wordAnalysis(interview, (err, results) => {
        if (err) { console.log(err); }
        this.interviewFillers.push(results);
        // console.log('interview word Analysis:', results);
      });
    };

    this.toneAnalysis = (transcription, callback) => {
      $http.post('/api/ibmtone', {
        data: {
          text: transcription,
        }
      })
        .then(({ data }) => {
          if (callback) {
            callback(null, data.document_tone);
          }
        }, ({ data }) => {
          if (callback) {
            callback(data, null);
          }
        });
    };
    this.wordAnalysis = (transcription, callback) => {
      $http.post('/api/wordanalysis', {
        data: {
          text: transcription
        }
      })
        .then(({ data }) => {
          if (callback) {
            callback(null, data);
          }
        }, ({ data }) => {
          if (callback) {
            callback(data, null);
          }
        });
    };
  });
