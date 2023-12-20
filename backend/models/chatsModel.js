const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatsSchema = new schema({
   members: [String],
   reciverId: String,
   lastMessage: String,
   reciverName: String,
   senderName: String,
   lastSender: String,
   reciverSeen: { type: Boolean, default: false },
   senderSeen: { type: Boolean, default: false },
   created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('chat', chatsSchema);
