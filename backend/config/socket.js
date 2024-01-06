const io = require('socket.io');
const usersModel = require('../models/usersModel');

const socketServer = new io.Server(8800, {
   cors: {
      origin: 'http://127.0.0.1:5173',
      // origin: 'http://127.0.0.1:4173',
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

module.exports = socketServer;
