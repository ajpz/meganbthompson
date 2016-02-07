'use strict'; 

var router = require('express').Router(); 
var Subscriber = require('./Subscriber.model'); 
var createAndSendEmail = require('../../../mailer/mailer.js'); 

module.exports = router; 

router.get('/', function(req, res, next) {
  Subscriber.find({}).exec()
    .then(function(subscribers) {
      res.status(200).json(subscribers); 
    })
})

router.post('/', function(req, res, next) {
  var newSubscriber = new Subscriber(req.body); 
  newSubscriber.save()
    .then(function(savedSubscriber) {
      res.status(200).json(savedSubscriber); 
    })
})

router.post('/email', function(req, res, next) {
  createAndSendEmail(req.body.subscribers, req.body.stories, req.body.email); 
  res.status(200).end(); 
})