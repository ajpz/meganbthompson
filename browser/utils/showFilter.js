app.filter("showFilter", function() {
  return function(input, showName) {
    if(!input) return null; 
    return input.filter(function(story) {
      // if(showName === "all") return true; 
      if(showName === "documentary") return story.type === showName; 
      return story.showName === showName; 
    })
  }
})