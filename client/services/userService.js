angular.module('app')
  .service('userService', function ($http, broadcastService) {
    this.isLoggedIn = false;
    this.userData = {};

    this.setUser = () => {
      this.getAllUserData((err, user) => {
        if (err) {
          console.error('ERROR: ', err);
        } else if (user !== false) {
          this.isLoggedIn = true;
          this.userData = user;
        } else {
          this.isLoggedIn = false;
        }
        broadcastService.send('loggedIn');
      });
    };

    this.getAllUserData = (callback) => {
      $http.get('/data/user')
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
  });
