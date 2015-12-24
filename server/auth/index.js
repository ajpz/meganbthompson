var router = require('express').Router(); 
var Admin = require('../api/admins/admin.model'); 

var passport = require('passport'); 


module.exports = router; 

router.post('/login', function(req, res, next) {

  Admin.findOne(req.body).exec()
    .then(function(admin) {
      if(!admin) {
        var err = new Error('Bad username'); 
        err.status = 401; 
        return next(err);
      }
      if(admin.password === req.body.password) {
        req.login(admin, function() { 
          res.json(admin); 
        })
      } else {
        var err = new Error('Bad Password'); 
        err.status = 401; 
        return next(err); 
      }
    })
    .then(null, next); 
})

router.get('/session-status', function(req, res, next) {
  console.log('HERERERERERERERERER')
  // console.log('the session details are : ', req.session.passport.user)
  // console.log('and more details are : ', req.user); 
  if(req.user) res.status(200).json(req.user); 
  res.status(401).send({message: 'no session'}); 
  // res.status(200).json(req.user); 
})

router.delete('/admin', function(req, res, next) {
  req.logout(); 
  res.status(204).end(); 
})
