app.config(function($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/app/home/home.html",
      authenticate: false
    })
})
