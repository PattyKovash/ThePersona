angular.module('app')
  .controller('AppCtrl', function ($uibModal, $location) {
    this.animationsEnabled = true;
    this.isLoggedIn = true;
    this.currentUrl = '/home';
    this.previousUrl = null;

    // Add active link styling to current page on reload
    this.setActiveOnReload = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(this.setActiveOnReload);
        this.removePrevActiveOnClick();
        this.currentUrl = $location.path();
        const current = document.getElementById(this.currentUrl);
        if  (current) {
          current.classList.add('active');
        }
      }
    }, 100);

    // Remove class 'active' on previous nav link
    this.removePrevActiveOnClick = () => {
      const activeElem = document.getElementsByClassName('active')[0];
      if (activeElem) {
        activeElem.classList.remove('active');
      }
      if ($location.path() !== this.currentUrl) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = $location.path();
      }
    };

    this.openComponentModal = function () {
      const modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        component: 'login'
      });
    };

    this.init = () => {
      this.setActiveOnReload;
    };

    this.analysis = [];
    this.fillerAnalysis = [];
    this.total = '';

    this.showAnalysis = (results) => {
      const { tones } = results;
      const renderedTones = tones.map(tone => `${tone.tone_name} - ${Math.round(tone.score * 100)} %`);
      this.analysis = renderedTones;
    };

    this.showFillers = (result) => {
      this.fillerAnalsis = [];
      for (let j in result[1]) {
        this.fillerAnalysis.push(`You used the word '${j}' ${result[1][j]} times`);
      }
      this.total = `Total word count: ${result[2]}`;
    };

    this.init();
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
