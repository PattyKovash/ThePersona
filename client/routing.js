angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    const states = [
      {
        name: 'app',
        url: '/',
        component: 'app'
      },
      {
        name: 'app.home',
        url: 'home',
        component: 'home'
      },
      {
        name: 'login',
        url: '/login',
        component: 'login'
      },
      {
        name: 'app.interview',
        url: 'interview',
        component: 'interview'
      },
      {
        name: 'app.interview.results',
        url: '/results',
        component: 'results'
      },
      {
        name: 'app.user',
        url: 'user',
        component: 'user'
        // NEED TO ADD SERVICE TO RETRIEVE USER ID
        // resolve: (UserService) => {
        // return PeopleService.getUser();
        // }
      },
      {
        name: 'app.user.dashboard',
        url: '/dashboard',
        component: 'userDashboard'
      },
      {
        name: 'app.user.interviews',
        url: '/interviews',
        component: 'userInterviews'
      },
      {
        name: 'app.user.videos',
        url: '/videos',
        component: 'userVideos'
      },
      {
        name: 'app.analysis',
        url: 'analysis',
        component: 'analysis'
      },
      {
        name: 'logout',
        url: '/logout',
        component: 'logout'
      }
    ];

    $urlRouterProvider.otherwise('/home');

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  });
