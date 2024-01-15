require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const io = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/mongoDbCon');
const errorHandler = require('./middleware/errorHandler');
const chatModel = require('./models/chatsModel');
const usersModel = require('./models/usersModel');
// require('./config/socket');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect with mongoDB
connectDB();

app.use('/user', require('./router/usersRouter'));
app.use('/offer', require('./router/offerRouter'));
app.use('/message', require('./router/chatRouter'));

app.use(errorHandler);

const expressServer = app.listen(PORT, () => {
   console.log(`server is live`);
});

const socketServer = new io.Server(expressServer, {
   cors: {
      // origin: 'http://127.0.0.1:5173',
      origin: 'https://justcars.vercel.app',
   },
});

let users = [];
let usersCurrentChat = [];

const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
   return users.find((user) => user.userId === userId);
};

const saveCurrentChat = (userId, chatId) => {
   usersCurrentChat = usersCurrentChat.filter((user) => user.userId != userId);
   usersCurrentChat.push({ userId, chatId: chatId?.id });
   console.log(usersCurrentChat);
};

socketServer.on('connection', (socket) => {
   //take userId and socketId from user
   socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      socketServer.emit('getUsers', users);
   });

   // users current chat
   socket.on('currentChat', async ({ userId, reciverId }) => {
      const chatId = await chatModel.findOne({ members: { $all: [userId, reciverId] } }).select('_id');
      saveCurrentChat(userId, chatId);
   });

   // send typing message
   socket.on('typing', ({ reciverId, senderId, username }) => {
      const user = getUser(reciverId);
      socketServer.to(user?.socketId).emit('isTyping', { username, senderId });
   });

   socket.on('sendMessage', async ({ senderId, reciverId, message }) => {
      const user = getUser(reciverId);
      const reciversChat = usersCurrentChat.find((user) => user.userId === reciverId);
      const sendersChat = usersCurrentChat.find((user) => user.userId === senderId);

      if (reciversChat?.chatId !== sendersChat?.chatId) {
         await usersModel.findByIdAndUpdate(reciverId, { $push: { unseenChats: sendersChat?.chatId } });
      }

      socketServer.to(user?.socketId).emit('getMessage', {
         senderId,
         message,
         reciverId,
         chatId: sendersChat?.chatId,
      });
   });

   //when disconnect
   socket.on('disconnect', ({ userId }) => {
      removeUser(socket?.id);
      socketServer.emit('getUsers', users);
      usersCurrentChat = usersCurrentChat.filter((user) => user.userId !== userId);
   });
});
