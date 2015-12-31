app.factory('SubscriberFactory', function($http) {
  
  return {

    addSubscriber: function(email) {
      return $http({
        method: 'POST', 
        url: '/api/subscribers', 
        data: { email: email }
      }).then(res => res.data)
    }, 

    getSubscribers: function() {
      return $http({
        method: 'GET', 
        url: '/api/subscribers'
      }).then(res => res.data); 
    }, 

    sendEmails: function(stories, subscribers) {
      var data = { stories: stories, subscribers: subscribers }; 
      return $http({
        method: 'POST', 
        url: '/api/subscribers/email', 
        data: data
      }).then(res => res.data)
    }

  }

})