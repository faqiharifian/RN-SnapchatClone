var express = require('express');
var router = express.Router();

var messageController = require('../controllers/api/messageController')
var authController = require('../controllers/api/authController')

router.post('/auth', authController.auth)

router.get('/messages', messageController.list)
router.post('/messages', messageController.post)

module.exports = router;