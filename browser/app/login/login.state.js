app.config(function($stateProvider) {
  $stateProvider
  .state("login", {
    url: "/login", 
    templateUrl: "/app/login/login.html", 
    controller: "LoginCtrl", 
    authenticate: false
  })
})