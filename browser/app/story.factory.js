app.factory('StoryFactory', function($http) {
  return {
    getStories: function(type) {
      return $http({
        method: 'GET', 
        url: '/api/stories/' + type, 
      })
      .then(function(res) {
        return res.data
      })
    },
    saveStory: function(storyDetails) {
      return $http({
        method: 'POST', 
        url: '/api/stories', 
        data: storyDetails
      }).then(res => res.data); 
    }
  }; 
})