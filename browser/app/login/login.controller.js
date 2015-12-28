app.controller('LoginCtrl', function($scope, AuthFactory, $state) {

  $scope.loginAdmin = function(adminDetails) {
    
    AuthFactory.loginAdmin(adminDetails)
      .then(function(admin) {
        $state.go('addStory'); 
    })
      .then(null, function(err) {
        $state.go('login'); 
      })
  }
})