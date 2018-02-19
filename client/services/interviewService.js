angular.module('app')
  .service('interviewService', function ($http, broadcastService, Interview, QandA, userService) {
    this.prompts = [];
    this.currentPromptsIndex = -1;
    this.currentPrompt = this.prompts[this.currentPromptsIndex];
    this.selectedPrompt = {};
    this.curInt = {};
    this.qAndA = {};
    this.userService = userService;
    this.userId = this.userService.userData.id;

    // Create new Interview instance
    this.createInterview = () => {
      this.curInt = new Interview(this.userId);
      console.log('LATEST INTERVIEW:', this.curInt);
    };

    // Create new QandA instance
    this.createQandA = (question) => {
      this.qAndA = new QandA(this.userId, question);
      console.log('Q and A:', this.qAndA);
    };

    // Add analysis to current interview instance
    this.updateEachAnswer = (promptID, answer, analysisName, analysis) => {
      const qAndA = this.curInt.qAndA[promptID];
      qAndA.answer = answer;
      qAndA[analysisName] = analysis;
    };

    // Add overall interview analysis to current interview instance
    this.updateOverall = (interview, analysisName, analysis) => {
      if (interview) {
        this.curInt.fullTranscript = interview;
      }
      this.curInt[analysisName] = analysis;
    };

    // Returns array of prompts matching input tag
    this.queryPrompts = (tag) => {
      return $http.get('/api/prompts', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          tags: tag
        }
      });
    };

    // Add Interview to DB
    this.addInterview = (intObj) => {
      return $http.post('/api/interviews', {
        intObj: intObj
      });
    };

    // Get interviews of user
    this.getInterviews = (userId) => {
      return $http.get('/api/interviews', {
        params: {
          userId: userId
        }
      });
    };

    this.selectNumPrompts = (numPrompts, prompts) => {
      const len = prompts.length;
      const dupPrompts = prompts.slice();
      let count = numPrompts;
      let index;
      const currentPrompts = [];
      if (numPrompts === null || numPrompts > len) {
        count = len;
      }
      for (let i = 0; i < count; i += 1) {
        index = Math.floor(Math.random() * dupPrompts.length);
        currentPrompts.push(dupPrompts[index]);
        dupPrompts.splice(index, 1);
      }
      this.prompts = currentPrompts;
      return this.getPrompts();
    };

    this.selectPrompt = (prompt) => {
      this.selectedPrompt = prompt;
      return this.selectedPrompt;
    };

    this.getPrompts = () => this.prompts;

    this.getNextPrompt = () => {
      console.log('here are the prompts:', this.prompts);
      this.currentPromptsIndex = this.currentPromptsIndex + 1;
      broadcastService.send('update', this.currentPromptsIndex);
    };
  });
