const express = require('express');
const router = express.Router();
const chat = require('../controllers/chatController');
const messages = require('../controllers/messagesController');

// chat routes
router.post('/create-new-chat', chat.createChat);
router.post('/get-chat-list', chat.getChatList);

// messages routes
router.post('/get-chat/:id/:page', messages.getChatMessages);
// router.post('/get-chat/:id', messages.getChatMessages);
router.post('/create-message', messages.createNewMessage);

module.exports = router;
