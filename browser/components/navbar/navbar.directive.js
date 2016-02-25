app.directive('myNavbar', function(AuthFactory, $state) {
  return {
    restrict: 'E', 
    templateUrl: 'components/navbar/navbar.html', 
    link: function(scope) {
      scope.logout = function() {
        return AuthFactory.logout()
          .then(function() {
            $state.go('home'); 
          })
      }
      
      //force the responsive navbar to collapse after a user selects a page
      $('#navbar-collapse-main a').click(function() {
        $('#navbar-collapse-main').collapse('hide'); 
      })

    }
  }
})  