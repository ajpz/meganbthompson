app.controller('EditStoryCtrl', function($scope, story, $state, StoryFactory, $filter) {
  
  $scope.story = story; 
  $scope.story.airDate = new Date($scope.story.airDate); //convert string date back to date object for angular

  $scope.keepChanges = function(story) {
    StoryFactory.updateStory(story._id, story)
      .then(function(story) {
        console.log('updated story is ', story); 
        $state.go('portfolio') // TODO: make this return to a hyperlink within the state, for the updated story, not just to the state generically
      })
  }

})