angular.module('app')
  .controller('interviewCtrl', function () {
    this.prompts = ['hello!'];
    this.options = {
      type: [
        { id: 0, name: '', value: '' },
        { id: 1, name: 'all', value: 'All' },
        { id: 2, name: 'non-technical', value: 'Non-Technical' },
        { id: 3, name: 'technical', value: 'Technical' }
      ],
      selectedType: { id: 0, name: '', value: '' }
    };
  })
  .component('interview', {
    controller: 'AppCtrl',
    templateUrl: 'templates/interview.html'
  });
