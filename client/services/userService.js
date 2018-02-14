angular.module('app')
  .service('userService', function ($http, broadcastService) {
    this.isLoggedIn = false;
    this.userData = {};

    this.setStatus = () => {
      this.getAllUserData((err, userData) => {
        // console.log('USERDATA:', userData);
        if (userData) {
          this.userData = userData;
          this.isLoggedIn = true;
          broadcastService.send('loggedIn');
        } else {
          this.isLoggedIn = userData;
        }
        // console.log('INSIDE SERVICE: ISLOGGEDIN:', this.isLoggedIn);
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
