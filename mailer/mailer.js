var fs = require('fs'); 
var ejs = require('ejs'); 
// var tumblr = require('tumblr.js'); //REMOVE
// Contains .csvParse() and .createTimeFilterer() 
var myUtils = require('./myUtils.js'); 
// Contains mandrill connection keys, new client instantiation, and scott's sendEmail() code
var sendEmail = require('./ignore/sendEmail.js'); 
// Returns tumber credential object
var initTumblrCreds = require('./ignore/initTumblrCreds.js'); 

var DAY_RANGE = 23; 

// Create Tumblr client connection 
var client = tumblr.createClient(initTumblrCreds()); 

//********************************************************
// Loops through all db subscribers, rendered email template
//  and invokes .sendEmail(); 
// @params: html template, 
//          array of recipients (only email addresses), 
//          array of stories
//********************************************************
function createAndSendEmail(template, subscribers, stories) {
  subscribers.forEach(function(subscriber) {
    var customizedTemplate = ejs.render(template, { latestStories: stories });
    ssendEmail(subscriber.email, 'Megan', 'meganbthompson@gmail.com', 'New stories available!', customizedTemplate)
  })
}
/********************************************************
/* Kicks everything off: 
/*    use Tumblr API to get blog posts, filter by 
/*    date, creates recipient list, and then kicks off 
/*    template generation and email sending
/********************************************************/
client.posts('ajp-z.tumblr.com', function(err, blog){
   //load and parse contact list and html template, generate latestPosts list
  var latestPosts = []; 
  var recipList = myUtils.csvParse(fs.readFileSync("./ignore/friend_list.csv", "utf8"));
  var emailTemplate = fs.readFileSync('html_template.ejs', 'utf8'); 
  //create a filter function time stamped NOW, with specified lookback DAY_RANGE!
  var timeFilter = myUtils.createTimeFilterer(DAY_RANGE); 
  //create object for each latest post and push to array 'latestPosts'  
  blog.posts.forEach(function(post) {
    if(timeFilter(post.date)) {
      latestPosts.push({
        post_url: post.post_url,
        title: post.title
      })
    }
  })
  createAndSendEmail(emailTemplate, recipList, latestPosts); 
})
