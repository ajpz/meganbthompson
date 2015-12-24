app.factory('AuthFactory', function($http, $rootScope) {

  var admin = { isAdmin: false }; 

  $rootScope.isLoggedIn = function() {
    return admin.isAdmin; 
  }

  return {

    signupAdmin: function(adminDetails) {
      return $http({
        method: 'POST', 
        url: '/signup', 
        data: adminDetails
      })
        .then(function(response) {
          return response.data; 
        })
    }, 

    loginAdmin: function(adminDetails) {
      console.log('authfactory loginAdmin invoked')
      return $http({
        method: 'POST', 
        url: '/auth/login',
        data: adminDetails
      })
        .then(function(response) {
          admin = response.data; 
          console.log('in auth callback: ', admin);
          return admin; 
        })
    }, 

    getSessionStatus: function() {
      console.log('Run ran getSessionStatus'); 
      return $http.get('/auth/session-status')
        .then(res => res.data)
        .then(function(sessionAdmin) {
          console.log('current session is ', sessionAdmin)
          admin = sessionAdmin; 
          return admin; 
        })
    }, 

    isLoggedIn: function() {
      return admin.isAdmin; 
    }, 

    logout: function() {
      return $http.delete('/auth/admin')
        .then(function() {
          return admin = { isAdmin : false }; 
        })
    }
  }
})