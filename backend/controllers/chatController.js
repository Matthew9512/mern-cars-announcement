const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');

const createChat = async function (req, res, next) {
   try {
      const { senderId, reciverId, message } = req.body;

      // find name of reciver
      const lastSender = await usersModel.findById(reciverId).select('username');

      await chatModel.create({
         members: [senderId, reciverId],
         reciverId,
         reciverName: lastSender?.username,
         lastSender: lastSender?.username,
         lastMessage: message,
      });

      await messageModel.create({
         senderId,
         members: [senderId, reciverId],
         message,
      });

      res.sendStatus(200);
   } catch (error) {
      next(error.message);
      console.log(error);
   }
};

const getChatList = async function (req, res, next) {
   try {
      const { userId } = req.body;

      const chatList = await chatModel.find({
         members: { $in: [userId] },
      });

      res.status(200).json(chatList);
   } catch (error) {
      next(error.message);
      console.log(error);
   }
};

module.exports = {
   createChat,
   getChatList,
};
