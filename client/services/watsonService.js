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
            broadcastService.send('toneAnalysis', { analysis: results.data.document_tone, promptID: promptID });
            console.log('promptID in watsonService:', promptID);
            console.log('results in watsonService:', results.data.document_tone);
            this.answerAnalysis.push(results.data.document_tone);
          } else {
            this.answerAnalysis.push('');
          }

          this.wordAnalysis(answer, (results) => {
            this.answerFillers.push(results);
          });
        })
        .catch((err) => {
          console.log('ERROR IN ANALYZE ANSWER: ', err);
          return err;
        });
    //   this.toneAnalysis(answer, (results) => {
    //     if (results === null) {
    //     } else {
    //     }
    //     if (cb) {
    //       cb(results);
    //     }
    //     console.log('tone anaylsis:', this.answerAnalysis);
    //   });

    //   this.wordAnalysis(answer, (err, results) => {
    //     if (err) { console.log(err); }
    //     this.answerFillers.push(results);
    //   });
    // };
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

    this.toneAnalysis = (transcription) => {
      return $http.post('/api/ibmtone', {
        data: {
          text: transcription,
        }
      });
    };

    // this.toneAnalysis = (transcription, callback) => {
    //   return $http.post('/api/ibmtone', {
    //     data: {
    //       text: transcription,
    //     }
    //   })
    //     .then(({ data }) => {
    //       console.log('DATA FROM TONE ANALYSIS: ', data);
    //       if (callback && data !== null) {
    //         callback(data.document_tone);
    //       } else {
    //         callback(data);
    //       }
    //     }, ({ data }) => {
    //       if (callback) {
    //         callback(data);
    //       }
    //     });
    // };
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
