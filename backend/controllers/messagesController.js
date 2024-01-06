const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');
const utils = require('../utils/constants');

const getChatMessages = async function (req, res, next) {
   try {
      const { senderId } = req.body;
      const { id, page } = req.params;

      const [findChat] = await chatModel.find({
         members: { $all: [senderId, id] },
      });

      // total amount of messages
      const pagesAmount = await messageModel.find({
         members: { $all: [senderId, id] },
      });

      const find = await messageModel
         .find({
            members: { $all: [senderId, id] },
         })
         .sort({ created: -1 })
         .limit(utils.MSG_RES_PER_PAGE)
         .skip((page - 1) * utils.MSG_RES_PER_PAGE);

      const chatMembers = {
         senderAvatar: findChat?.senderAvatar,
         reciverAvatar: findChat?.reciverAvatar,
         senderName: findChat?.senderName,
         reciverName: findChat?.reciverName,
      };

      res.status(200).json({
         find,
         chatMembers,
         pagesAmount: Math.ceil(pagesAmount.length / utils.MSG_RES_PER_PAGE),
      });
   } catch (error) {
      next(error.message);
      console.log(error);
   }
};

const createNewMessage = async function (req, res, next) {
   try {
      const { senderId, reciverId, message } = req.body;

      await messageModel.create({
         senderId,
         members: [senderId, reciverId],
         message,
      });

      // find name of reciver
      const lastSender = await usersModel.findById(senderId).select('username');

      await chatModel.findOneAndUpdate(
         { members: { $all: [senderId, reciverId] } },
         { lastSender: lastSender?.username, lastMessage: message, reciverId, created: new Date(), reciverSeen: false }
      );

      res.sendStatus(200);
   } catch (error) {
      next(error.message);
      console.log(error);
   }
};

module.exports = {
   getChatMessages,
   createNewMessage,
};
