'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/getUsersList', controller.index);
router.post('/register', controller.register);
router.post('/login', controller.login);



module.exports = router;