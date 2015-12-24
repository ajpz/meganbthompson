var express = require('express');
var app = express(); 
var path = require('path'); 

require('./logging.middleware')(app); 
require('./statics.middleware')(app); 

require('./requestState.middleware')(app); 

app.use('/api', require('../api')); 
  
app.use('/auth', require('../auth'));  
    
app.use(function(req, res, next) {
  // console.log('session Id: ', req.session.cookie); 
  console.log('session user: ', req.user, req.session.passport); 
  next(); 
})
// serve index.html 
app.get('/', function(req, res, next) {
  console.log('in / route and the req.user is ', req.user); 
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'index.html')); 
})


app.use('/*', function(req, res, next) {
  var error = new Error('No route'); 
  error.status = '404'; 
  next(error); 
})

require('./error.middleware')(app); 

module.exports = app;  
// var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
// var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
// validFrontendRoutes.forEach(function (stateRoute) {
//  app.get(stateRoute, function (req, res) {
//    res.sendFile(indexPath);
//  });
// });


// catch all invaild front-end routes