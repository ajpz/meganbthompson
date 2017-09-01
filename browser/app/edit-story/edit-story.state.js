app.config(function($stateProvider) {
  $stateProvider
  .state("editStory", {
    url: "/:id/edit",
    templateUrl: "app/edit-story/edit-story.html", 
    controller: "EditStoryCtrl", 
    resolve: {
      story: function($stateParams, StoryFactory) {
        return StoryFactory.getStory($stateParams.id)
          .then(function(story) {
            console.log("story returned was", story); 
            return story; 
          })
      }
    }, 
    authenticate: true
  })
})