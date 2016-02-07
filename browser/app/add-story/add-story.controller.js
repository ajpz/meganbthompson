app.controller('AddStoryCtrl', function($scope, AuthFactory, StoryFactory, $state) {

  console.log('AddStroyCtrl running....')
  $scope.lastStorySaved = null; 
  $scope.newStory = {}; 

  $scope.postStory = function(newStory) {

      StoryFactory.saveStory(newStory)
        .then(function(savedStory){
          $scope.lastStorySaved = savedStory; 
          $scope.newStory = {}; 
          $state.go('addStory')
        })
        .then(null, function(err) {
          console.log('in error cb ', err);

        })
  } 
})