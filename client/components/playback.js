angular.module('app')
  .controller('playbackController', function (recordingService, videoUploader, interviewService) {
    // services
    this.recordingService = recordingService;
    this.videoUploader = videoUploader;
    this.interviewService = interviewService;

    // state properties
    this.recordedBlobs = [...this.recordingService.recording];
    this.recordingBlob = new Blob(this.recordedBlobs, { type: 'video/webm' });

    // cache DOM elements
    this.recordedVideo = document.querySelector('video#recorded');
    this.downloadButton = document.querySelector('button#download');

    // method to allow rendering of playback
    this.play = () => {
      const video = this.recordedVideo;
      const superBuffer = new Blob(this.recordedBlobs);
      video.src = window.URL.createObjectURL(superBuffer);
      video.addEventListener('loadedmetadata', () => {
        if (video.duration === Infinity) {
          video.currentTime = 1e101;
          video.ontimeupdate = () => {
            video.currentTime = 0;
            video.ontimeupdate = () => {
              delete video.ontimeupdate;
            };
          };
        }
      });
    };
    // invoke on compononent mount
    this.play();

    // method to turn video data into a URL
    this.generateVideoURL = () => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.uploadVideo(reader.result);
        this.interviewService.latestInterview.videoUrl = reader.result;
        console.log('LATEST INT AFTER URL: ', this.interviewService.latestInterview);
      });
      console.log('READ AS DATA URL', reader.readAsDataURL(this.recordingBlob));
      reader.readAsDataURL(this.recordingBlob);
    };
    // invoke on compononent mount
    this.generateVideoURL();

    // method that utilizes service to send video to the server
    this.uploadVideo = (videoURL) => {
      this.videoUploader.upload(videoURL, (err, data) => {
        if (data) {
          console.log('Video successfully uploaded', data);
        } else {
          console.log('Video could not be uploaded', err);
        }
      });
    };

    // method to allow user to download the recording
    this.download = () => {
      const url = window.URL.createObjectURL(this.recordingBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recording.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    };
  })
  .component('playback', {
    controller: 'playbackController',
    templateUrl: 'templates/playback.html'
  });
