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
      origin: 'https://justcars.vercel.app',
   },
});

let users = [];

const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
   return users.find((user) => user.userId === userId);
};

socketServer.on('connection', (socket) => {
   //take userId and socketId from user
   socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      socketServer.emit('getUsers', users);
   });

   // send typing message
   socket.on('typing', ({ reciverId, senderId, username }) => {
      const user = getUser(reciverId);
      socketServer.to(user?.socketId).emit('isTyping', { username, senderId });
   });

   socket.on('sendMessage', async ({ senderId, reciverId, message }) => {
      const user = getUser(reciverId);

      socketServer.to(user?.socketId).emit('getMessage', {
         senderId,
         message,
         reciverId,
      });
   });

   //when disconnect
   socket.on('disconnect', () => {
      removeUser(socket?.id);
      socketServer.emit('getUsers', users);
   });
});
