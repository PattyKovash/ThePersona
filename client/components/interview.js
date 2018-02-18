angular.module('app')
  .controller('interviewCtrl', function (interviewService, $location, $scope) {
    this.interviewService = interviewService;

    // Broadcasts
    $scope.$on('update', (event, args) => {
      const currentPromptIndex = args;
      this.currentPrompt = this.prompts[currentPromptIndex].question;
      this.showPrompts = true;
    });
    $scope.$on('toneAnalysis', (event, results) => {
      this.interviewService.latestInterview.qAndA[results.promptID].toneAnalysis = results.analysis;
      console.log('latestInterview after tone: ', this.interviewService.latestInterview);
    });
    $scope.$on('wordAnalysis', (event, results) => {
      this.interviewService.latestInterview.qAndA[results.promptID].wordAnalysis = results.analysis;
      console.log('latestInterview after tone: ', this.interviewService.latestInterview);
    });
    $scope.$on('overallTones', (event, results) => {
      this.interviewService.latestInterview.overallTones = results.analysis;
      console.log('FINAL OVERALL TONES: ', this.interviewService.latestInterview);
    });
    $scope.$on('overallWords', (event, results) => {
      this.interviewService.latestInterview.overallWords = results.analysis;
      console.log('FINAL OVERALL WORDS: ', this.interviewService.latestInterview);
    });

    this.prompts = [];
    this.currentPromptIndex = -1;
    this.currentPrompt = '';

    this.selectedPracticePrompt = this.interviewService.selectedPrompt;
    this.options = {
      type: [
        { id: 0, name: '', value: '' },
        { id: 1, name: 'all', value: 'All' },
        { id: 2, name: 'non-technical', value: 'Non-Technical' },
        { id: 3, name: 'technical', value: 'Technical' }
      ],
      selectedType: { id: 1, name: 'all', value: 'All' }
    };

    this.init = () => {
      this.interviewService.queryPrompts('all', (err, data) => {
        this.prompts = this.interviewService.selectNumPrompts(10, data);
      });
    };

    this.setPrompts = () => {
      const tag = this.options.selectedType.name;
      this.interviewService.queryPrompts(tag, (err, data) => {
        this.prompts = this.interviewService.selectNumPrompts(null, data);
      });
    };

    this.selectPrompt = () => {
      this.selectedPrompt = this.interviewService.selectPrompt(this.selectedPrompt);
    };

    this.init();
  })
  .component('interview', {
    controller: 'interviewCtrl',
    templateUrl: 'templates/interview.html'
  });
