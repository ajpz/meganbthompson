app.controller('JournalismCtrl', function($scope, StoryFactory) {
  
  StoryFactory.getStories('journalism')
    .then(function(stories) {
      $scope.stories = stories; 
    })

  $scope.getVideoUrl = function(story) {
    console.log(' in function call: ', story.videoUri)
    return 'https://www.youtube.com/embed/' + story.videoUri; 
  }

})