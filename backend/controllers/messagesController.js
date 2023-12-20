const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');

const utils = require('../utils/constants');

const getChatMessages = async function (req, res, next) {
   try {
      const { senderId } = req.body;
      const { id, page } = req.params;
      // mark messages as readed

      const findChat = await chatModel.find({
         members: { $all: [senderId, id] },
      });

      // mark chat as readed if user is the one who recives messages
      if (senderId === findChat.at(0)?.reciverId) {
         await chatModel.findOneAndUpdate({ members: { $all: [senderId, id] } }, { reciverSeen: true }, { new: true });
      }

      // total amount of messages
      const pagesAmount = await messageModel.find({
         members: { $all: [senderId, id] },
      });

      const find = await messageModel
         .find({
            members: { $all: [senderId, id] },
         })
         .sort({ created: -1 })
         .limit(utils._RES_PER_PAGE)
         .skip((page - 1) * utils._RES_PER_PAGE);

      res.status(200).json({ find, pagesAmount: Math.ceil(pagesAmount.length / utils._RES_PER_PAGE) });
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
         { lastSender: lastSender?.username, lastMessage: message, created: new Date(), reciverId, reciverSeen: false }
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
