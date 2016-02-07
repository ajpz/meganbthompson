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

      console.log(scope.showTitle); 

      $document.on('scroll', function(event) {
        if ($document.scrollTop() >= 240) {
          element.addClass("fix-selector"); 
        } else {
          element.removeClass("fix-selector"); 
        }
      })
    }
  }
})