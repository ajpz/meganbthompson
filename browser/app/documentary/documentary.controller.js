app.controller('DocumentaryCtrl', function($scope, StoryFactory) {
  StoryFactory.getStories('documentary')
    .then(function(stories) {
      $scope.stories = stories; 
    })

  $scope.getVideoUrl = function(story) {
    return story.videoUri; 
  }
})