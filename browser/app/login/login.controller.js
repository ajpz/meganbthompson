app.controller('LoginCtrl', function($scope, AuthFactory, $state) {

  $scope.loginAdmin = function(adminDetails) {
    
    AuthFactory.loginAdmin(adminDetails)
      .then(function(admin) {
        console.log('in CTRL'); 
        console.log(admin); 
        // console.log('in LoginCtrl callback and admin status is ', AuthFactory.admin.isAdmin); 
        $state.go('addStory'); 
    })
      .then(null, function(err) {
        console.log('in errorback in login Ctrl ', err); 
        $state.go('login'); 
      })
  }
})