var app = angular.module('mtSiteApp', ['ui.router', 'ngSanitize']); 

// app.config(function ($urlRouterProvider, $locationProvider) {
//   $locationProvider.html5Mode(true);
//   $urlRouterProvider.otherwise('/'); 
//   $urlRouterProvider.when('/auth/:provider', function () {
//     window.location.reload();
//   });
// });


app.config(function($sceDelegateProvider, $locationProvider, $urlRouterProvider) {
  // must set base path for relative urls. Add following to header: <base href="/">
  // $locationProvider.html5Mode(true); //get rid of # from urls
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**', 
    
  ]);
});


app.run(function($rootScope, $state, AuthFactory) {

  AuthFactory.getSessionStatus()
    .then(function(session) {
      console.log("current session is ", session); 
    }); 

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if(toState.authenticate && !AuthFactory.isLoggedIn()) {
      $state.go('login'); 
      event.preventDefault(); 
    }
  })
})