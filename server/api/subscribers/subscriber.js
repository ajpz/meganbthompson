'use strict'; 

var router = require('express').Router(); 
var Subscriber = require('./Subscriber.model'); 

module.exports = router; 


router.post('/', function(req, res, next) {
  var newSubscriber = new Subscriber(req.body); 
  newSubscriber.save()
    .then(function(savedSubscriber) {
      res.status(200).json(savedSubscriber); 
    })
})