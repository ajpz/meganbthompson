app.config(function($stateProvider) {
  $stateProvider
    .state("addStory", {
      url: "/addStory",
      templateUrl: "app/add-story/add-story.html",
      controller: "AddStoryCtrl",
      authenticate: true
    })
})
