const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');

const createChat = async function (req, res, next) {
   try {
      const { senderId, reciverId, message, senderName, senderAvatar } = req.body;
      // find reciver
      const reciver = await usersModel.findByIdAndUpdate(reciverId);

      const newChat = await chatModel.create({
         members: [senderId, reciverId],
         reciverId,
         reciverName: reciver?.username,
         senderName,
         lastSender: reciver?.username,
         lastMessage: message,
         reciverAvatar: reciver?.usersAvatar,
         senderAvatar,
         sellerId: reciverId,
      });

      // update reciver doc with new chat id
      reciver.unseenChats.push(newChat._id);
      reciver.save();

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

      await usersModel.findByIdAndUpdate(senderId, { $pull: { unseenChats: id } }, { new: true });

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
