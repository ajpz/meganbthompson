app.controller("ContactCtrl", function($scope, SubscriberFactory) {

  var variable = "hello world!"; 
  $scope.htmlTest = "<h3>" + variable +"</h3>"; 

  $scope.addSubscriber = function() {
    SubscriberFactory.addSubscriber($scope.subscriberEmail)
    .then(function(subscriber) {
      $scope.subscriberEmail = ""; 
      // clean form
    })
  }

})