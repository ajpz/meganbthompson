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
    }, 
    link: function(scope, element, attrs) {
      scope.showNames = [
        { displayName: 'PBS NewsHour', 
          value: 'newsHour' }, 
        { displayName: 'NeedToKnow', 
          value: 'needToKnow' }, 
        { displayName: 'World Focus', 
          value: 'worldFocus' }, 
        { displayName: 'Film', 
          value: 'film' }, 
        { displayName: 'Treasures of New York', 
          value: 'treasures'}
      ]
    }
  }
})