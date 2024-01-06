const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');

const createChat = async function (req, res, next) {
   try {
      const { senderId, reciverId, message, senderName, senderAvatar } = req.body;
      // find name of reciver
      const reciver = await usersModel.findById(reciverId).select('username usersAvatar');
      // const sender = await usersModel.findById(senderId).select('usersAvatar');

      await chatModel.create({
         members: [senderId, reciverId],
         reciverId,
         reciverName: reciver?.username,
         senderName,
         lastSender: reciver?.username,
         lastMessage: message,
         reciverAvatar: reciver?.usersAvatar,
         // senderAvatar: sender?.usersAvatar,
         senderAvatar,
         sellerId: reciverId,
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

// mark chat as readed if user is the one who recives messages
const updateChat = async function (req, res, next) {
   try {
      const { senderId } = req.body;
      const { id } = req.params;

      const [findChat] = await chatModel.find({
         members: { $all: [senderId, id] },
      });

      if (senderId === findChat?.reciverId) {
         await chatModel.findOneAndUpdate({ members: { $all: [senderId, id] } }, { reciverSeen: true }, { new: true });
      }

      res.sendStatus(200);
   } catch (error) {
      next(error.message);
      console.log(error);
   }
};

module.exports = {
   createChat,
   getChatList,
   updateChat,
};
