app.controller('SendEmailCtrl', function($scope, $state, subscribers, allStories, SubscriberFactory, StoryFactory, $anchorScroll) {

  $scope.sendStatus = null; 
  $scope.subscribers = subscribers; 
  $scope.allStories = allStories; 

  $scope.email = { 
    greeting: 'Hello,', 
    body: "Thank you for your interest in my work! I've released a few new stories to my website that you might be interested in. See below for links.", 
    goodbye: 'All the best, Megan'
  }

  // $scope.showStories = function() {
  //   StoryFactory.getStories($scope.query.addDate)
  //     .then(function(stories) {
  //       $scope.stories = stories; 
  //     })
  //     .then(null, console.error.bind(console))
  // }

  $scope.sendEmails = function() {
    if($scope.selectedStories.length === 0) return; 
    SubscriberFactory.sendEmails($scope.selectedStories, $scope.subscribers, $scope.email) 
      .then(function() {
        $scope.sendStatus = 'Emails sent!'; 
        $scope.selectedStories = null; 
        // $scope.query = null; 
        $anchorScroll(); 
      })
      .then(null, console.error.bind(console))
  }

  $scope.setStories = function () {

  }

})