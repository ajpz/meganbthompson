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
    }
  }
})  