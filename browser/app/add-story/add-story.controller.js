app.controller('AddStoryCtrl', function($scope, AuthFactory, StoryFactory, $state) {
  $scope.lastStorySaved = null; 

  $scope.postStory = function(storyDetails) {
    if(!AuthFactory.isLoggedIn()) $state.go('login'); 
    else {
      console.log('postStory called with ', storyDetails); 
      StoryFactory.saveStory(storyDetails)
        .then(function(savedStory){
          console.log('story saved'); 
          $scope.lastStorySaved = savedStory; 
          $state.go('addStory')
        })
    }
  } 
})