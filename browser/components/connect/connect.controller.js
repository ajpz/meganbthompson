app.controller('ConnectCtrl', function($scope, SubscriberFactory) {
  
  $scope.addSubscriber = function() {
    console.log('email to add is: ', $scope.subscriberEmail); 
    SubscriberFactory.addSubscriber($scope.subscriberEmail)
    .then(function(subscriber) {
      console.log(subscriber); 
      // clean form
    })

  }
  
})