'use strict'; 

var router = require('express').Router(); 

module.exports = router; 

router.use('/stories', require('./stories/story'));
router.use('/subscribers', require('./subscribers/subscriber'));

