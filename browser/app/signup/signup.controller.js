app.controller("SignupCtrl", function($scope, AuthFactory, $state) {

  $scope.signupAdmin = function(adminDetails) {  
    AuthFactory.signupUser(adminDetails)
      .then(function(admin) {
        if(admin.isAdmin) {
          AuthFactory.isAdmin = true; 
          $state.go("AddStory"); 
        } else {
          AuthFactory.isAdmin = false; 
          $state.go("home"); 
        }

      })
  }
})