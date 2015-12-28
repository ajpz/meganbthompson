app.directive('storyForm', function() {
  return {
    restrict: 'E', 
    templateUrl: '/components/story-form/story-form.html', 
    scope: {
      lastSaved: "=",
      formTitle: "@", 
      submitType: "@", 
      storyDetails: "=", 
      submitMethod: "&"
    }
  }
})