app.directive('showSelector', function($document) {
  return {
    restrict: 'E', 
    templateUrl: '/components/show-selector/show-selector.html', 
    scope: {
      isActiveCategory: "=", 
      setCategory: "=", 
      showTitle: "="
    }, 
    link: function(scope, element, attrs) {

      $document.on('scroll', function(event) {
        var screenWidth = $(window).width(); 

        if(screenWidth >= 768) {
          if ($document.scrollTop() >= 240) {
            element.addClass("fix-selector"); 
          } else {
            element.removeClass("fix-selector"); 
          } 
        } else {
          if ($document.scrollTop() >= 240) {
            element.addClass("fix-selector"); 
          } else {
            element.removeClass("fix-selector"); 
          }  
        }
      })
    }
  }
})