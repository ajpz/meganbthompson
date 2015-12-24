app.factory('SubscriberFactory', function($http) {
  
  return {

    addSubscriber: function(email) {
      return $http({
        method: 'POST', 
        url: '/api/subscribers', 
        data: { email: email }
      }).then(res => res.data)
    }

  }

})