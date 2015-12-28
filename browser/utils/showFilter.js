app.filter('showFilter', function() {
  return function(input, showName) {
    return input.filter(function(story) {
      if(showName === 'all') return true; 
      return story.showName === showName; 
    })
  }
})