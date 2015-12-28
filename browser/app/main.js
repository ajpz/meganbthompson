var app = angular.module('mtSiteApp', ['ui.router']); 

// app.config(function ($urlRouterProvider, $locationProvider) {
//   $locationProvider.html5Mode(true);
//   $urlRouterProvider.otherwise('/');
  
//   $urlRouterProvider.when('/auth/:provider', function () {
//     window.location.reload();
//   });
// });


app.config(function($sceDelegateProvider, $locationProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);

  // $locationProvider.html5Mode(true); 
});

app.run(function(AuthFactory) {
  AuthFactory.getSessionStatus()
    .then(function(session) {
      console.log("current session is ", session); 
    }); 
})