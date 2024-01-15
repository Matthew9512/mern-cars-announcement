const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatsSchema = new schema({
   members: [String],
   reciverId: String,
   lastMessage: String,
   reciverName: String,
   senderName: String,
   lastSender: String,
   created: { type: Date, default: Date.now },
   reciverAvatar: String,
   senderAvatar: String,
   sellerId: String,
});

module.exports = mongoose.model('chat', chatsSchema);
