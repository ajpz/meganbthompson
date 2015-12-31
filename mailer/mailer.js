var fs = require('fs'); 
var ejs = require('ejs'); 

// Contains mandrill connection keys, new client instantiation, and scott's sendEmail() code
var sendEmail = require('./mandrill'); 

module.exports = createAndSendEmail; 

//********************************************************
// Loops through all db subscribers, rendered email template
//  and invokes .sendEmail(); 
// @params: array of recipients (only email addresses), 
//          array of stories
//********************************************************
function createAndSendEmail(subscribers, stories) {
  var template = fs.readFileSync('./mailer/html_template.ejs', 'utf8'); 
  subscribers.forEach(function(subscriber) {
    var customizedTemplate = ejs.render(template, { latestStories: stories });
    sendEmail('BobLaRue', subscriber.email, 'Megan', 'meganbthompson@gmail.com', 'New stories available!', customizedTemplate)
  })
}