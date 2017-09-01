app.directive("signin", function() {
  return {
    restrict: "E", 
    templateUrl: "/components/signin/signin.html", 
    scope: {
      actionLabel: "@",
      adminCreds: "=", 
      adminAction: "&"
    } 
  }
})