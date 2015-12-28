app.factory('StoryFactory', function($http) {
  return {
    // get all stories of type: ['journalism', 'documentary']
    getStories: function(type) {
      return $http({
        method: 'GET', 
        url: '/api/stories/', 
        params: { type : type }
      })
      .then(function(res) {
        return res.data
      })
    },
    getStory: function(id) {
      return $http({
        method: 'GET', 
        url: '/api/stories/' + id
      })
      .then(res => res.data)
    },
    saveStory: function(storyDetails) {
      return $http({
        method: 'POST', 
        url: '/api/stories', 
        data: storyDetails
      }).then(res => res.data); 
    }, 
    updateStory: function(id, story) {  
      return $http({
        method: 'PUT', 
        url: 'api/stories/' + id + '/edit', 
        data: story
      }).then(res => res.data); 
    }, 
    deleteStory: function(id) {
      return $http({
        method: 'DELETE', 
        url: '/api/stories/' + id
      })
    }
  }; 
})