app.controller('SendEmailCtrl', function($scope, $state, SubscriberFactory, StoryFactory) {

  $scope.sendStatus = null; 

  SubscriberFactory.getSubscribers()
    .then(function(subscribers) {
      $scope.subscribers = subscribers; 
      console.log(subscribers); 
    })
    .then(null, function(err) {
      console.error(err); 
    }); 

  $scope.showStories = function() {
    StoryFactory.getStories($scope.query.addDate)
      .then(function(stories) {
        $scope.stories = stories; 
      })
      .then(null, console.error.bind(console))
  }

  $scope.sendEmails = function() {
    if($scope.stories.length === 0) return; 
    SubscriberFactory.sendEmails($scope.stories, $scope.subscribers) 
      .then(function() {
        $scope.sendStatus = 'Emails sent!'; 
        $scope.stories = null; 
        $scope.query = null; 
      })
      .then(null, console.error.bind(console))
  }

})