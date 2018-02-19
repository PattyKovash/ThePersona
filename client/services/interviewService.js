angular.module('app')
  .service('interviewService', function ($http, broadcastService, Interview, QandA) {
    this.prompts = [];
    this.currentPromptsIndex = -1;
    this.currentPrompt = this.prompts[this.currentPromptsIndex];
    this.selectedPrompt = {};
    this.curInt = {};
    this.qAndA = {};

    // Create new Interview instance
    this.createInterview = () => {
      this.curInt = new Interview();
      console.log('LATEST INTERVIEW:', this.curInt);
    };

    // Create new QandA instance
    this.createQandA = (question) => {
      this.qAndA = new QandA(question);
      console.log('Q and A:', this.qAndA);
    };

    this.updateEachAnswer = (promptID, answer, analysisName, analysis) => {
      console.log('INSIDE UPDATE EACH - ANSWER: ', answer);
      console.log('INSIDE UPDATE EACH - ID: ', promptID);
      console.log('INSIDE UPDATE EACH - NAME: ', analysisName);
      console.log('INSIDE UPDATE EACH - ANALYSIS: ', analysis);

      const qAndA = this.curInt.qAndA[promptID];
      console.log('INSIDE UPDATE EACH - QA: ', qAndA);
      qAndA.answer = answer;
      qAndA[analysisName] = analysis;
      console.log('CURRENT INT: ', this.curInt);
    };

    this.updateOverall = (interview, analysisName, analysis) => {
      if (interview) {
        this.curInt.fullTranscript = interview;
      }
      this.curInt[analysisName] = analysis;
      console.log('CURRENT INT: ', this.curInt);
    };

    // Returns array of prompts matching input tag
    this.queryPrompts = (tag, callback) => {
      $http.get('/api/prompts', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          tags: tag
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
