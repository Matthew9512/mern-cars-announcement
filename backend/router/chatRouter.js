const express = require('express');
const router = express.Router();
const chat = require('../controllers/chatController');
const messages = require('../controllers/messagesController');
const verifyJwt = require('../middleware/verifyJwt');

// chat routes
router.post('/create-new-chat', verifyJwt, chat.createChat);
router.post('/get-chat-list', verifyJwt, chat.getChatList);

// messages routes
router.post('/get-chat/:id/:page', verifyJwt, messages.getChatMessages);
router.post('/create-message', verifyJwt, messages.createNewMessage);

module.exports = router;
