app.factory("StoryFactory", function($http) {
  var extractData = function(response) {
    return response.data; 
  };

  return {
    // get all stories of type: ["journalism", "documentary"] or within date range
    getStories: function(arg) {
      var params = {}; 

      if(["journalism", "documentary"].indexOf(arg)>-1) {
        params.type = arg; 
      } else if(arg instanceof Date) {
        params.addDate = arg; 
      }

      return $http({
        method: "GET", 
        url: "/api/stories/", 
        params: params      
      })
      .then(function(res) {
        return res.data
      })
    },
    getStory: function(id) {
      return $http({
        method: "GET", 
        url: "/api/stories/" + id
      })
      .then(extractData)
    },
    saveStory: function(storyDetails) {
      return $http({
        method: "POST", 
        url: "/api/stories", 
        data: storyDetails
      }).then(extractData); 
    }, 
    updateStory: function(id, story) {  
      return $http({
        method: "PUT", 
        url: "api/stories/" + id + "/edit", 
        data: story
      }).then(extractData); 
    }, 
    deleteStory: function(id) {
      return $http({
        method: "DELETE", 
        url: "/api/stories/" + id
      })
    }
  }; 
})