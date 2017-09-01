app.controller("LoginCtrl", function($scope, AuthFactory, $state) {

  $scope.badAttempt = false; 
  $scope.adminDetails = null; 

  $scope.loginAdmin = function(adminDetails) {
    
    AuthFactory.loginAdmin(adminDetails)
      .then(function(admin) {
        $state.go("addStory"); 
    })
      .then(null, function(err) {
        $scope.badAttempt = err.data.message; 
        $scope.adminDetails = null; 
      })
  }
})