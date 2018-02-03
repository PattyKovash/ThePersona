angular.module('app')
  .service('PromptsService', function ($http) {
    this.getPrompts = (tag, numPrompts, callback) => {
      $http.get('http://localhost:3000/api/prompts?', {
        params: {
          tag: tag,
          numPrompts: numPrompts
        }
      })
        .then(({ data }) => {
          // NEED TO VERIFY FORMAT OF DATA
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
