app.config(function($stateProvider) {
  $stateProvider
    .state('about', {
      url: '/about', 
      templateUrl: '/app/about/about.html', 
      authenticate: false
    })
})