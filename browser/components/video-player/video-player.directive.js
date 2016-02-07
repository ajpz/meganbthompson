app.directive('videoPlayer', function() {
  return {
    restrict: 'E', 
    // templateUrl: '/components/video-player/video-player.html',
    template: '<div ng-include="templateHtml"></div>', 
    scope: {
      // videoUrl: "@"
      videoUrl: "&"
    }, 
    link: function(scope, element, attrs){
      console.log('\n\nTEMPLATE CALLBACK\n'); 
      console.log(scope.videoUrl(),'\n\n\n'); 

      scope.url = scope.videoUrl(); 

      var videoTemplate; 

      if(scope.url.indexOf('youtube') > -1) {
        // handle youtube
        console.log('\n\nYOUTUBE IF\n\n\n')
        videoTemplate = '/components/video-player/video-player-youtube.html'; 
      } else if(scope.url.indexOf('thirteen') > -1) {
        //handle pbs
        videoTemplate = '/components/video-player/video-player-pbs.html'; 
      } else if(scope.url.indexOf('pbs') > -1) { 
        videoTemplate = '/components/video-player/video-player-pbs.html';
      }else if(scope.url.indexOf('vimeo') > -1) {
        //handle vimeo
        videoTemplate = '/components/video-player/video-player-vimeo.html'; 
      }

      scope.templateHtml = videoTemplate; 
    }
  }
})