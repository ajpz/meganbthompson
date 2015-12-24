app.config(function($stateProvider) {
  $stateProvider
    .state('documentary', {
      url: '/documentary', 
      templateUrl: '/app/documentary/documentary.html', 
      controller: 'DocumentaryCtrl'
    })
})