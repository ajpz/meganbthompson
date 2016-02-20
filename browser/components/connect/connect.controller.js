app.controller('ConnectCtrl', function($scope, SubscriberFactory) {
  
  $scope.addSubscriber = function() {
    SubscriberFactory.addSubscriber($scope.subscriberEmail)
    .then(function(subscriber) {
      $scope.subscriberEmail = ''; 
      // clean form
    })

  }
  
})