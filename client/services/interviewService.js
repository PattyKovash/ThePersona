angular.module('app')
  .service('interviewService', function ($http, broadcastService, Interview, QandA) {
    this.prompts = [];
    this.currentPromptsIndex = -1;
    this.currentPrompt = this.prompts[this.currentPromptsIndex];
    this.selectedPrompt = {};
    this.latestInterview = {};
    this.qAndA = {};

    // Create new Interview instance
    this.createInterview = () => {
      this.latestInterview = new Interview();
      console.log('LASTEST INTERVIEW:', this.latestInterview);
    };

    // Create new QandA instance
    this.createQandA =  () => {
      this.qAndA = new QandA();
      console.log('Q and A:', this.qAndA);
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
