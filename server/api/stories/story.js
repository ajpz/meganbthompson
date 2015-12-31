'use strict'; 

var router = require('express').Router(); 
var Story = require('./story.model'); 

module.exports = router; 

// mount: /api/stories

// get all stories, or stories filtered by type
router.get('/', function(req, res, next) {
  var query = {}; 
  if(req.query.type) query = { type : req.query.type };
  if(req.query.addDate) query = { addDate : {$gt : req.query.addDate}}; 

  Story.find(query).exec()
    .then(function(stories) {
      res.status(200).json(stories); 
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

// save a new story
router.post('/', function(req, res, next) {

  var newStory = new Story(req.body); 
  newStory.save()
    .then(function(newStory) {
      res.status(200).json(newStory); 
    })
    .then(null, next); 
})

// update an existing story
router.put('/:id/edit', function(req, res, next) {
  console.log('hit put route with ', req.params.id, req.body); 
  Story.findOneAndUpdate({ _id : req.params.id }, req.body, { runValidators: true, new : true }).exec()
    .then(function(updatedStory) {
      console.log(updatedStory); 
      res.status(200).json(updatedStory); 
    })
    .then(null, next); 
})

// delete a story
router.delete('/:id', function(req, res, next) {
  Story.remove({ _id : req.params.id })
    .then(function(deleteStatus) {
      res.status(204).end(); 
    })
    .then(null, next); 
})




