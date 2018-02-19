angular.module('app')
  .controller('resultsCtrl', function (interviewService, watsonService, $scope) {
    this.interviewService = interviewService;
    this.watsonService = watsonService;

    // Broadcasts
    $scope.$on('analysis Done', (event) => {
      console.log('analysis done, organizing results');
      //Analysis for whole interview
      this.interviewTones = watsonService.interviewAnalysis;
      this.interviewFillers = watsonService.interviewFillers;

      //Analysis per question
      this.questions = interviewService.prompts;
      this.answers = this.watsonService.responses;

      this.tones = this.watsonService.answerAnalysis;
      this.fillers = this.watsonService.answerFillers;


      //Arrange analysis into object per question
      this.arranged = [];

      this.arrangeAnswers = () => {
        for (let i = 0; i < this.answers.length; i += 1) {
          const output = {};
          output.question = this.questions[i].question;
          output.answer = this.answers[i];
          if (this.tones[i] && this.tones[i].tone_categories) {
            output.tones = this.tones[i].tone_categories[0].tones;
            output.language = this.tones[i].tone_categories[1].tones;
            output.social = this.tones[i].tone_categories[2].tones;
          }
          output.fillers = this.fillers[i];
          this.arranged.push(output);
        }
      };
      this.arrangeAnswers();
      console.log(this.arranged);

      //Arrange overall interview analysis into one object
      this.overall = [];
      this.arrangeOverall = () => {
        const output = {};
        if (this.interviewTones[0].tone_categories) {
          output.tones = this.interviewTones[0].tone_categories[0].tones;
          output.language = this.interviewTones[0].tone_categories[1].tones;
          output.social = this.interviewTones[0].tone_categories[2].tones;

        }
        output.fillers = this.interviewFillers[0];
        output.overall = true;
        this.overall.push(output);
      };
      this.arrangeOverall();

      console.log(this.overall);
      this.resultsLoaded = true;
      // $scope.$apply();
    });
  })
  .component('results', {
    controller: 'resultsCtrl',
    templateUrl: 'templates/results.html'
  });
