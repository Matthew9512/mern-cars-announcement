const chatModel = require('../models/chatsModel');
const messageModel = require('../models/messageModel');
const usersModel = require('../models/usersModel');

const getChatMessages = async function (req, res, next) {
   try {
      const { senderId } = req.body;
      const { id } = req.params;

      const find = await messageModel
         .find({
            members: { $all: [senderId, id] },
         })
         .sort({ created: -1 });

      res.status(200).json(find);
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
      // ==========
      await chatModel.findOneAndUpdate(
         { members: { $all: [senderId, reciverId] } },
         { lastSender: lastSender?.username, lastMessage: message, created: new Date() }
      );
      // const filter = {
      //    members: { $all: [senderId, reciverId] },
      // };

      // const update = {
      //    lastSender: lastSender?.username,
      //    lastMessage: message,
      // };

      // await chatModel.findOneAndUpdate(filter, update);
      // ==========

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
