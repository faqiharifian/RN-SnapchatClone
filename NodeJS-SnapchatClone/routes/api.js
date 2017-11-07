var express = require('express');
var router = express.Router();

var messageController = require('../controllers/api/messageController');

router.get('/messages', messageController.list);

module.exports = router;