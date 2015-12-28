app.controller('AddStoryCtrl', function($scope, AuthFactory, StoryFactory, $state) {
  $scope.lastStorySaved = null; 
  $scope.newStory = {}; 

  $scope.postStory = function(newStory) {
    if(!AuthFactory.isLoggedIn()) $state.go('login'); 
    else {
      StoryFactory.saveStory(newStory)
        .then(function(savedStory){
          $scope.lastStorySaved = savedStory; 
          $scope.newStory = {}; 
          $state.go('addStory')
        })
    }
  } 
})