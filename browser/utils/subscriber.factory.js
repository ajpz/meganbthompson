app.factory('SubscriberFactory', function($http) {
  var extractData = function(response) {
    return response.data; 
  };
  
  return {

    addSubscriber: function(email) {
      return $http({
        method: 'POST', 
        url: '/api/subscribers', 
        data: { email: email }
      }).then(extractData)
    }, 

    getSubscribers: function() {
      return $http({
        method: 'GET', 
        url: '/api/subscribers'
      }).then(extractData); 
    }, 

    sendEmails: function(stories, subscribers, emailText) {
      
      var data = { 
        stories: stories, 
        subscribers: subscribers, 
        email: emailText 
      }; 
      
      return $http({
        method: 'POST', 
        url: '/api/subscribers/email', 
        data: data
      }).then(extractData)
    }

  }

})