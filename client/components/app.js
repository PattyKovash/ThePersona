angular.module('app')
  .controller('AppCtrl', function ($uibModal, $location, userService, $scope) {
    this.userService = userService;
    this.isLoggedIn = true;
    this.animationsEnabled = true;
    this.currentUrl = '/home';
    this.previousUrl = null;

    // Broadcasts
    $scope.$on('loggedIn', () => {
      this.isLoggedIn = this.userService.isLoggedIn;
      console.log('INSIDE OF BROADCAST:', this.isLoggedIn);
    });

    // Function to run on page load
    this.init = () => {
      this.setActiveOnReload;
      this.userService.setUser();
    };

    // Add active link styling to current page on reload
    this.setActiveOnReload = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(this.setActiveOnReload);
        this.removePrevActiveOnClick();
        this.currentUrl = $location.path();
        const current = document.getElementById(this.currentUrl);
        if (current) {
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
    // this.init();
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
