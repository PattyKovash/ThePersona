angular.module('app')
  .controller('userCtrl', function ($location) {
    this.userData = {
      id: 1,
      name: 'Patty Kovash',
      email: 'pattykovash@gmail.com',
      username: 'khamd002',
      firstName: 'Patty',
      lastName: 'Kovash',
      provider: '',
      facebookUserId: '45678913345',
      googleUserId: '789911344663'
    };

    this.userInterviews = [
      {
        id: 3546545,
        questions: [],
        createdAt: '2018-02-10 20:22:16'
      },
      {
        id: 7489877,
        questions: [],
        createdAt: '2018-02-10 20:22:16'
      },
      {
        id: 3214856,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      },
      {
        id: 4313216,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      },
      {
        id: 5646587,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      }
    ];

    this.removeActiveSub = (e) => {
      const activeElem = document.getElementsByClassName('activeSub')[0];
      if (activeElem) {
        activeElem.classList.remove('activeSub');
      }
      e.target.classList.add('activeSub');
    };

    this.userRemoveActive = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(this.userRemoveActive);
        const userActive = document.getElementsByClassName('ui vertical sticky menu dashboardMenu')[0].getElementsByClassName('active')[0];
        if (userActive) {
          userActive.classList.remove('active');
        }
      }
    }, 100);

    this.userInit = () => {
      this.userRemoveActive;
    };
  })
  .component('user', {
    controller: 'userCtrl',
    templateUrl: 'templates/user.html'
  });
