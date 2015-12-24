app.config(function($stateProvider) {
  $stateProvider
    .state('journalism', {
      url: '/journalism', 
      templateUrl: '/app/journalism/journalism.html',
      controller: 'JournalismCtrl'
    })
})