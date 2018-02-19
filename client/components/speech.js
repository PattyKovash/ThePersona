angular.module('app')
  .controller('speechController', function ($scope, $animate, interviewService, watsonService, recordingService) {
    $animate.enabled(false, 'speech');

    // services
    this.interviewService = interviewService;
    this.watsonService = watsonService;
    this.recordingService = recordingService;

    // state properties
    $scope.$on('update', (event, args) => {
      const currentPromptIndex = args;
      this.currentID = this.interviewService.prompts[currentPromptIndex].id;
    });
    this.interviewStarted = false;
    this.recognizing = false;
    this.responses = [];
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.submitButton = $('button.large.ui.right.floated.button.submit');

    // initialize speech interface
    this.recognition = new webkitSpeechRecognition();
    // set attributes
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    // set event handlers
    this.recognition.onstart = () => {
      this.recognizing = true;
      $scope.$apply();
    };
    this.recognition.onerror = () => {
      this.ignoreOnEnd = true;
    };
    this.recognition.onend = () => {
      this.recognizing = false;
      $scope.$apply();
    };
    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          this.finalTranscript += `${event.results[i][0].transcript} .`;
        } else {
          this.interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    this.toggleRecognition = () => {
      if (!this.recognizing) {
        this.finalTranscript = '';
        this.ignoreOnend = false;
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    };

    this.handleSubmission = () => {
      this.recognition.stop();
      this.recordingService.submitRecording();
      this.interviewService.createQandA(this.interviewService.prompts[this.interviewService.currentPromptsIndex]);
      this.interviewService.curInt.qAndA[this.currentID] = this.interviewService.qAndA;
      setTimeout(() => {
        this.responses.push(this.finalTranscript);
        this.watsonService.analyzeAnswer(this.finalTranscript, this.currentID)
          .then(() => {
            return this.watsonService.analyzeInterview(this.responses.join('.'), this.currentID);
          })
          .catch((err) => {
            console.log('ERROR: ', err);
          });
      }, 500);
    };

    this.getNextPrompt = () => {
      this.promptCount = this.promptCount + 1 || 1;
      this.reachedLastQuestion = (this.promptCount === 2);
      this.recognition.stop();
      console.log(this.currentID);
      let previousID = this.currentID;
      this.interviewService.createQandA(this.interviewService.prompts[this.interviewService.currentPromptsIndex]);
      this.interviewService.curInt.qAndA[previousID] = this.interviewService.qAndA;
      this.interviewService.getNextPrompt();
      setTimeout(() => {
        console.log(this.finalTranscript);
        this.responses.push(this.finalTranscript);
        this.watsonService.analyzeAnswer(
          this.finalTranscript,
          previousID
        );
        this.finalTranscript = '';
        this.recognition.start();
      }, 500);
    };

    this.startInterview = () => {
      this.interviewService.createInterview();
      this.interviewStarted = true;
      this.recordingService.startRecording();
      this.interviewService.getNextPrompt();
      this.toggleRecognition();
    };
  })

  .component('speech', {
    controller: 'speechController',
    templateUrl: 'templates/speech.html'
  });
