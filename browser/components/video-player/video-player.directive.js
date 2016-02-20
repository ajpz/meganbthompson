app.directive('videoPlayer', function() {
  return {
    restrict: 'E', 
    template: '<div ng-include="templateHtml"></div>', 
    scope: {
      videoUrl: "&", 
      videoImg: "&"
    }, 
    link: function(scope, element, attrs){

      scope.url = scope.videoUrl(); 
      scope.img = scope.videoImg(); 

      var videoTemplate; 

      if(scope.url.indexOf('youtube') > -1) {
        // handle youtube
        videoTemplate = '/components/video-player/video-player-youtube.html'; 
      } else if(scope.url.indexOf('thirteen') > -1) {
        //handle pbs
        videoTemplate = '/components/video-player/video-player-thirteen.html'; 
      } else if(scope.url.indexOf('pbs') > -1) { 
        videoTemplate = '/components/video-player/video-player-pbs.html';
      }else if(scope.url.indexOf('snagfilms') > -1) {
        //handle vimeo
        videoTemplate = '/components/video-player/video-player-vimeo.html'; 
      }

      scope.templateHtml = videoTemplate; 
    }
  }
})