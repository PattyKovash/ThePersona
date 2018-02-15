angular.module('app')
  .controller('userCtrl', function ($location, userService, $scope) {
    this.userService = userService;
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userData = this.userService.userData;

    $scope.$on('loggedIn', () => {
      this.isLoggedIn = this.userService.isLoggedIn;
      this.userData = this.userService.userData;
      console.log('USER DATA FROM USER COMPONENT:', this.userData);
    });

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

    this.userVideos = [
      {
        id: 123456,
        createdAt: '2018-02-08 10:22:16',
        url: 'http://res.cloudinary.com/dinoa/video/upload/v1517876710/dab9lvbcpe5djbrymhde.mkv'
      },
      {
        id: 234567,
        createdAt: '2018-02-10 10:22:17',
        url: 'http://res.cloudinary.com/dinoa/video/upload/v1518550712/mfvroni0blex8jt8ih9l.mkv'
      }
    ];

    this.userAnswers = [
      {
        id: 1,
        response: 'My favorite data structure is a hash table because of its constant time insertion and lookup.',
        prompt: 'What is your favorite data structure and why?',
        analysis: {
          tones: [
            {
              "score": 0.576521,
              "tone_id": "confident",
              "tone_name": "confident"
            },
            {
              "score": 0.829888,
              "tone_id": "analytical",
              "tone_name": "Analytical"
            }
          ]
        },
        interviewId: 1,
        createdAt: '2018-02-01 13:59:55'
      },
      {
        id: 2,
        response: 'Javascript is the de facto language of front end development. most engineers have had some interaction with it regardless of role. its versatility also allows for fullstack development in one language',
        prompt: 'Why did you choose to learn Javascript over another language?',
        analysis: {
          tones: [
            {
              "score": 0.915245,
              "tone_id": "confident",
              "tone_name": "Confident"
            },
            {
              "score": 0.829888,
              "tone_id": "joy",
              "tone_name": "Joy"
            }
          ]
        },
        interviewId: 1,
        createdAt: '2018-02-01 14:02:54'
      },
      {
        id: 3,
        response: 'Hashtables because of database operation optimizations and versatility objects are life!',
        prompt: 'What is your favorite data structure and why?',
        analysis: {
          tones: [
            {
              "score": 0.753246,
              "tone_id": "confident",
              "tone_name": "confident"
            },
            {
              "score": 0.832146,
              "tone_id": "analytical",
              "tone_name": "Analytical"
            }
          ]
        },
        interviewId: 2,
        createdAt: '2018-02-04 10:30:55'
      },
      {
        id: 4,
        response: 'Both call and apply are used to bind the this parameter to the context passed in as the first argument. Call takes individual arguments after the first argument, and apply takes an array of arguments after the first argument.',
        prompt: 'What is the difference between call and apply? What are their purposes?',
        analysis: {
          tones: [
            {
              "score": 0.854432,
              "tone_id": "confident",
              "tone_name": "confident"
            },
            {
              "score": 0.732145,
              "tone_id": "analytical",
              "tone_name": "Analytical"
            }
          ]
        },
        interviewId: 2,
        createdAt: '2018-02-04 10:32:55'
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
