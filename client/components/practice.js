angular.module('app')
  .component('practice', {
    bindings: {
      promptType: '<'
    },
    controller: 'interviewCtrl',
    templateUrl: 'templates/practice.html'
  });
