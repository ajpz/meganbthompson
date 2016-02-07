app.controller('PortfolioCtrl', function($scope, StoryFactory, $state) {

  // got rid of category all
  $scope.currentCategory = 'newsHour'; 
  
  // get stories from db and place on scope
  StoryFactory.getStories()
    .then(function(stories) {
      $scope.stories = stories; 
    })

  $scope.isActiveCategory = function(category) {
    return $scope.currentCategory === category; 
  }

  $scope.setCategory = function(category) {
    $scope.currentCategory = category; 
  }

  $scope.getCategory = function() {
    return $scope.currentCategory; 
  }

  // create full url from youtube formatted resource-id
  $scope.getVideoUrl = function(story) {
    if(story.videoUri.indexOf('http') > -1) return story.videoUri; 
    console.log('got here'); 
    return 'https://www.youtube.com/embed/' + story.videoUri;  
  }

  // uses StoryFactory to premanently remove stories
  $scope.removeStory = function(story) {
    var response = prompt("Are you sure you want to delete this story? (y or n)"); 
    
    if(response === 'y') {
      StoryFactory.deleteStory(story._id)
      .then(function() {
        $state.go($state.current, {}, {reload: true}); 
      })
      .then(null, function(err) {
      })
    } else {
      $state.go($state.current, {}, {reload: true}); 
    }
  }

})