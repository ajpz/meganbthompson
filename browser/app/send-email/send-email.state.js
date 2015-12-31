app.config(function($stateProvider) { 
  $stateProvider.state('sendEmail', {
    url: '/subscribers/sendEmail', 
    templateUrl: 'app/send-email/send-email.html', 
    controller: 'SendEmailCtrl'
  })

})