app.factory('AuthFactory', function($http, $rootScope) {

  var admin = { isAdmin: false }; 

  var extractData = function(response) {
    return response.data; 
  };

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
      return $http({
        method: 'POST', 
        url: '/auth/login',
        data: adminDetails
      })
        .then(function(response) {
          admin = response.data; 
          return admin; 
        })
    }, 

    getSessionStatus: function() {
      return $http.get('/auth/session-status')
        .then(extractData)
        .then(function(sessionAdmin) {
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