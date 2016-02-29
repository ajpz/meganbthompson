var app = angular.module('mtSiteApp', ['ui.router', 'ngSanitize']); 

// app.config(function ($urlRouterProvider, $locationProvider) {
//   $urlRouterProvider.when('/auth/:provider', function () {
//     window.location.reload();
//   });
// });


app.config(function($sceDelegateProvider, $locationProvider, $urlRouterProvider) {
  // must set base path for relative urls. Add following to header: <base href="/">
  // $locationProvider.html5Mode(true); //get rid of # from urls
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/'); 
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**', 
    
  ]);
});


app.run(function($rootScope, $state, AuthFactory) {

  AuthFactory.getSessionStatus()
    .then(function(session) {
      console.log("current session is ", session); 
    }); 

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if(toState.authenticate && !AuthFactory.isLoggedIn()) {
      $state.go('login'); 
      event.preventDefault(); 
    }
  })
})
app.factory('AuthFactory', function($http, $rootScope) {

  var admin = { isAdmin: false }; 

  var extractData = function(response) {
    return response.data; 
  };

  $rootScope.isLoggedIn = function() {
    return admin.isAdmin; 
  }

  return {

    signupAdmin: function(adminDetails) {
      return $http({
        method: 'POST', 
        url: '/signup', 
        data: adminDetails
      })
        .then(function(response) {
          return response.data; 
        })
    }, 

    loginAdmin: function(adminDetails) {
      return $http({
        method: 'POST', 
        url: '/auth/login',
        data: adminDetails
      })
        .then(function(response) {
          admin = response.data; 
          return admin; 
        })
    }, 

    getSessionStatus: function() {
      return $http.get('/auth/session-status')
        .then(extractData)
        .then(function(sessionAdmin) {
          admin = sessionAdmin; 
          return admin; 
        })
    }, 

    isLoggedIn: function() {
      return admin.isAdmin; 
    }, 

    logout: function() {
      return $http.delete('/auth/admin')
        .then(function() {
          return admin = { isAdmin : false }; 
        })
    }
  }
})
app.filter('showFilter', function() {
  return function(input, showName) {
    if(!input) return null; 
    return input.filter(function(story) {
      // if(showName === 'all') return true; 
      if(showName === 'documentary') return story.type === showName; 
      return story.showName === showName; 
    })
  }
})
app.factory('StoryFactory', function($http) {
  var extractData = function(response) {
    return response.data; 
  };

  return {
    // get all stories of type: ['journalism', 'documentary'] or within date range
    getStories: function(arg) {
      var params = {}; 

      if(['journalism', 'documentary'].indexOf(arg)>-1) {
        params.type = arg; 
      } else if(arg instanceof Date) {
        params.addDate = arg; 
      }

      return $http({
        method: 'GET', 
        url: '/api/stories/', 
        params: params      
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
      .then(extractData)
    },
    saveStory: function(storyDetails) {
      return $http({
        method: 'POST', 
        url: '/api/stories', 
        data: storyDetails
      }).then(extractData); 
    }, 
    updateStory: function(id, story) {  
      return $http({
        method: 'PUT', 
        url: 'api/stories/' + id + '/edit', 
        data: story
      }).then(extractData); 
    }, 
    deleteStory: function(id) {
      return $http({
        method: 'DELETE', 
        url: '/api/stories/' + id
      })
    }
  }; 
})
app.factory('SubscriberFactory', function($http) {
  var extractData = function(response) {
    return response.data; 
  };
  
  return {

    addSubscriber: function(email) {
      return $http({
        method: 'POST', 
        url: '/api/subscribers', 
        data: { email: email }
      }).then(extractData)
    }, 

    getSubscribers: function() {
      return $http({
        method: 'GET', 
        url: '/api/subscribers'
      }).then(extractData); 
    }, 

    sendEmails: function(stories, subscribers, emailText) {
      
      var data = { 
        stories: stories, 
        subscribers: subscribers, 
        email: emailText 
      }; 
      
      return $http({
        method: 'POST', 
        url: '/api/subscribers/email', 
        data: data
      }).then(extractData)
    }

  }

})
app.config(function($stateProvider) {
  $stateProvider
    .state('about', {
      url: '/about', 
      templateUrl: '/app/about/about.html', 
      authenticate: false
    })
})
app.controller('ContactCtrl', function($scope, SubscriberFactory) {

  var variable = 'hello world!'; 
  $scope.htmlTest = "<h3>" + variable +"</h3>"; 

  $scope.addSubscriber = function() {
    SubscriberFactory.addSubscriber($scope.subscriberEmail)
    .then(function(subscriber) {
      $scope.subscriberEmail = ''; 
      // clean form
    })
  }

})
app.config(function($stateProvider) {
  $stateProvider
    .state('contact', {
      url: '/contact', 
      templateUrl: '/app/contact/contact.html', 
      controller: 'ContactCtrl',
      authenticate: false
    })
})
app.controller('AddStoryCtrl', function($scope, AuthFactory, StoryFactory, $state) {

  console.log('AddStroyCtrl running....')
  $scope.lastStorySaved = null; 
  $scope.newStory = {}; 

  $scope.postStory = function(newStory) {

      StoryFactory.saveStory(newStory)
        .then(function(savedStory){
          $scope.lastStorySaved = savedStory; 
          $scope.newStory = {}; 
          $state.go('addStory')
        })
        .then(null, function(err) {
          console.log('in error cb ', err);

        })
  } 
})
app.config(function($stateProvider) {
  $stateProvider
  .state('addStory', {
    url: '/addStory',  
    templateUrl: 'app/add-story/add-story.html',
    controller: 'AddStoryCtrl', 
    authenticate: true
  })
})
app.config(function($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/app/home/home.html', 
    authenticate: false
  })
})
app.controller('EditStoryCtrl', function($scope, story, $state, StoryFactory, $filter) {
  
  $scope.story = story; 
  $scope.story.airDate = new Date($scope.story.airDate); //convert string date back to date object for angular

  $scope.keepChanges = function(story) {
    StoryFactory.updateStory(story._id, story)
      .then(function(story) {
        console.log('updated story is ', story); 
        $state.go('portfolio') // TODO: make this return to a hyperlink within the state, for the updated story, not just to the state generically
      })
  }

})
app.config(function($stateProvider) {
  $stateProvider
  .state('editStory', {
    url: '/:id/edit',
    templateUrl: 'app/edit-story/edit-story.html', 
    controller: 'EditStoryCtrl', 
    resolve: {
      story: function($stateParams, StoryFactory) {
        return StoryFactory.getStory($stateParams.id)
          .then(function(story) {
            console.log('story returned was', story); 
            return story; 
          })
      }
    }, 
    authenticate: true
  })
})
app.controller('PortfolioCtrl', function($scope, StoryFactory, $state) {

  // got rid of category all
  $scope.currentCategory = 'newsHour'; 
  
  // get stories from db and place on scope
  StoryFactory.getStories()
    .then(function(stories) {
      $scope.stories = stories; 
    })

  $scope.isActiveCategory = function(category) {
    return $scope.currentCategory === category; 
  }

  $scope.setCategory = function(category) {
    $scope.currentCategory = category; 
  }

  $scope.getCategory = function() {
    return $scope.currentCategory; 
  }

  // create full url from youtube formatted resource-id
  $scope.getVideoUrl = function(story) {
    if(story.videoUri.indexOf('http') > -1) return story.videoUri; 
    return 'https://www.youtube.com/embed/' + story.videoUri;  
  }

  $scope.getVideoImg = function(story) {
    return story.videoImg; 
  }

  // uses StoryFactory to premanently remove stories
  $scope.removeStory = function(story) {
    var response = prompt("Are you sure you want to delete this story? (y or n)"); 
    
    if(response === 'y') {
      StoryFactory.deleteStory(story._id)
      .then(function() {
        $state.go($state.current, {}, {reload: true}); 
      })
      .then(null, function(err) {
      })
    } else {
      $state.go($state.current, {}, {reload: true}); 
    }
  }

})
app.config(function($stateProvider) {
  $stateProvider
    .state('portfolio', {
      url: '/portfolio', 
      templateUrl: '/app/portfolio/portfolio.html',
      controller: 'PortfolioCtrl', 
      authenticate: false
    })
})
app.controller('SignupCtrl', function($scope, AuthFactory, $state) {

  $scope.signupAdmin = function(adminDetails) {  
    AuthFactory.signupUser(adminDetails)
      .then(function(admin) {
        if(admin.isAdmin) {
          AuthFactory.isAdmin = true; 
          $state.go('AddStory'); 
        } else {
          AuthFactory.isAdmin = false; 
          $state.go('home'); 
        }

      })
  }
})
app.config(function($stateProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup', 
    templateUrl: 'app/signup/signup.html', 
    controller: 'SignupCtrl', 
    authenticate: false
  })
})
app.controller('LoginCtrl', function($scope, AuthFactory, $state) {

  $scope.badAttempt = false; 
  $scope.adminDetails = null; 

  $scope.loginAdmin = function(adminDetails) {
    
    AuthFactory.loginAdmin(adminDetails)
      .then(function(admin) {
        $state.go('addStory'); 
    })
      .then(null, function(err) {
        $scope.badAttempt = err.data.message; 
        $scope.adminDetails = null; 
      })
  }
})
app.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login', 
    templateUrl: '/app/login/login.html', 
    controller: 'LoginCtrl', 
    authenticate: false
  })
})
app.controller('SendEmailCtrl', function($scope, $state, subscribers, allStories, SubscriberFactory, StoryFactory, $anchorScroll) {

  $scope.sendStatus = null; 
  $scope.subscribers = subscribers; 
  $scope.allStories = allStories; 

  $scope.email = { 
    greeting: 'Hello,', 
    body: "Thank you for your interest in my work! I've released a few new stories to my website that you might be interested in. See below for links.", 
    goodbye: 'All the best, Megan'
  }

  // $scope.showStories = function() {
  //   StoryFactory.getStories($scope.query.addDate)
  //     .then(function(stories) {
  //       $scope.stories = stories; 
  //     })
  //     .then(null, console.error.bind(console))
  // }

  $scope.sendEmails = function() {
    if($scope.selectedStories.length === 0) return; 
    SubscriberFactory.sendEmails($scope.selectedStories, $scope.subscribers, $scope.email) 
      .then(function() {
        $scope.sendStatus = 'Emails sent!'; 
        $scope.selectedStories = null; 
        // $scope.query = null; 
        $anchorScroll(); 
      })
      .then(null, console.error.bind(console))
  }

  $scope.setStories = function () {

  }

})
app.config(function($stateProvider) { 
  $stateProvider.state('sendEmail', {
    url: '/subscribers/sendEmail', 
    templateUrl: 'app/send-email/send-email.html', 
    controller: 'SendEmailCtrl', 
    resolve: {
      subscribers: function(SubscriberFactory) {
        return SubscriberFactory.getSubscribers();  
      }, 
      allStories: function(StoryFactory) {
        return StoryFactory.getStories(); 
      }
    },
    authenticate: true
  })

})
app.directive('myJumbotron', function() {
  return {
    restrict: 'E', 
    templateUrl: 'components/jumbotron/jumbotron.html'
  }
})
app.controller('ConnectCtrl', function($scope, SubscriberFactory) {
  
  $scope.addSubscriber = function() {
    SubscriberFactory.addSubscriber($scope.subscriberEmail)
    .then(function(subscriber) {
      $scope.subscriberEmail = ''; 
      // clean form
    })

  }
  
})
app.directive('connect', function() {
  return {
    restrict: 'E', 
    templateUrl: '/components/connect/connect.html', 
    controller: 'ConnectCtrl'
  }
})
app.directive('footer', function() {
  return {
    restrict: 'E', 
    templateUrl: '/components/footer/footer.html'
  }
})
app.directive('signin', function() {
  return {
    restrict: 'E', 
    templateUrl: '/components/signin/signin.html', 
    scope: {
      actionLabel: "@",
      adminCreds: "=", 
      adminAction: '&'
    } 
  }
})
app.directive('myNavbar', function(AuthFactory, $state) {
  return {
    restrict: 'E', 
    templateUrl: 'components/navbar/navbar.html', 
    link: function(scope) {
      scope.logout = function() {
        return AuthFactory.logout()
          .then(function() {
            $state.go('home'); 
          })
      }
      
      //force the responsive navbar to collapse after a user selects a page
      $('#navbar-collapse-main a').click(function() {
        $('#navbar-collapse-main').collapse('hide'); 
      })

    }
  }
})  
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
app.directive('videoPlayer', function() {
  return {
    restrict: 'E', 
    template: '<div ng-include="templateHtml"></div>', 
    scope: {
      videoUrl: "&", 
      videoImg: "&"
    }, 
    link: function(scope, element, attrs){

      scope.url = scope.videoUrl(); 
      scope.img = scope.videoImg(); 

      var videoTemplate; 

      if(scope.url.indexOf('youtube') > -1) {
        // handle youtube
        videoTemplate = '/components/video-player/video-player-youtube.html'; 
      } else if(scope.url.indexOf('thirteen') > -1) {
        //handle pbs
        videoTemplate = '/components/video-player/video-player-thirteen.html'; 
      } else if(scope.url.indexOf('pbs') > -1) { 
        videoTemplate = '/components/video-player/video-player-pbs.html';
      }else if(scope.url.indexOf('snagfilms') > -1) {
        //handle vimeo
        videoTemplate = '/components/video-player/video-player-vimeo.html'; 
      }

      scope.templateHtml = videoTemplate; 
    }
  }
})