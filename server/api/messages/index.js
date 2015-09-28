'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.post('/', controller.index);
router.post('/send', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;