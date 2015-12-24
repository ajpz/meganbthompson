'use strict'; 

var router = require('express').Router(); 
var Story = require('./story.model'); 

module.exports = router; 

// mount: /api/stories

// get all stories by type
router.get('/:type', function(req, res, next) {

  Story.find({ type: req.params.type }).exec()
    .then(function(stories) {
      res.status(200).json(stories); 
    })
    .then(null, next); 
})

// save a new story
router.post('/', function(req, res, next) {

  var newStory = new Story(req.body); 
  newStory.save()
    .then(function(newStory) {
      res.status(200).json(newStory); 
    })
    .then(null, next); 
})

// get one story
router.get('/:id', function(req, res, next) {
  console.log('hit route with ', req.params.id)
  Story.findOne({ _id : req.params.id }).exec()
    .then(function(story) {
      res.status(200).json(story); 
    })
    .then(null, next); 
})




