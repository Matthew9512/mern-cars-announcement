// const chatModel = require('../models/chatsModel');
// const messageModel = require('../models/messageModel');
// const usersModel = require('../models/usersModel');

// const createChat = async function (req, res, next) {
//    try {
//       const { senderId, reciverId, message } = req.body;

//       // find name of reciver
//       const lastSender = await usersModel.findById(reciverId).select('username');

//       await chatModel.create({
//          members: [senderId, reciverId],
//          lastSender: lastSender?.username,
//          lastMessage: message,
//       });

//       res.sendStatus(200);
//    } catch (error) {
//       next(error.message);
//       console.log(error);
//    }
// };

// const getChat = async function (req, res, next) {
//    try {
//       console.log(req.body);
//       const { senderId, reciverId } = req.body;
//       console.log(`qwqw`, senderId, reciverId);

//       const find = await messageModel.find({
//          members: { $all: [senderId, reciverId] },
//       });
//       console.log(find);
//       res.status(200).json(find);
//    } catch (error) {
//       next(error.message);
//       console.log(error);
//    }
// };

// const getChatList = async function (req, res, next) {
//    try {
//       const { id: userId } = req.params;
//       const chatList = await chatModel.find({
//          members: { $in: [userId] },
//       });

//       res.status(200).json(chatList);
//    } catch (error) {
//       next(error.message);
//       console.log(error);
//    }
// };

// const newMessage = async function (req, res, next) {
//    try {
//       const { senderId, reciverId, message } = req.body;

//       await messageModel.create({
//          senderId,
//          members: [senderId, reciverId],
//          message,
//       });

//       // find name of reciver
//       const lastSender = await usersModel.findById(senderId).select('username');

//       await chatModel.findOneAndUpdate({
//          members: [senderId, reciverId],
//          lastMessage: message,
//          lastSender: lastSender?.username,
//       });

//       res.sendStatus(200);
//    } catch (error) {
//       next(error.message);
//       console.log(error);
//    }
// };

// module.exports = {
//    createChat,
//    getChat,
//    getChatList,
//    newMessage,
// };
