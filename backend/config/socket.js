// const server = require('../server');

// let users = [];

// const addUser = (userId, socketId) => {
//    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//    users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//    return users.find((user) => user.userId === userId);
// };

// server.socketServer.on('connection', (socket) => {
//    console.log('connected');
//    //take userId and socketId from user
//    socket.on('addUser', (userId) => {
//       console.log(userId);
//       addUser(userId, socket.id);
//       server.socketServer.emit('getUsers', users);
//    });

//    socket.on('sendMessage', ({ senderId, reciverId, message }) => {
//       console.log(message);
//       const user = getUser(reciverId);
//       console.log(user);
//       server.socketServer.to(user?.socketId).emit('getMessage', {
//          senderId,
//          message,
//       });
//    });

//    //when disconnect
//    socket.on('disconnect', () => {
//       console.log('a user disconnected!');
//       removeUser(socket?.id);
//       server.socketServer.emit('getUsers', users);
//    });
// });
