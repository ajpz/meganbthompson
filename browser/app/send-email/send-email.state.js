app.config(function($stateProvider) { 
  $stateProvider.state('sendEmail', {
    url: '/subscribers/sendEmail', 
    templateUrl: 'app/send-email/send-email.html', 
    controller: 'SendEmailCtrl', 
    resolve: {
      subscribers: function(SubscriberFactory) {
        return SubscriberFactory.getSubscribers();  
      }, 
      allStories: function(StoryFactory) {
        return StoryFactory.getStories(); 
      }
    },
    authenticate: true
  })

})