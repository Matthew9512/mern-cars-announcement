const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageModel = new schema({
   senderId: String,
   members: [String],
   message: String,
   created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('message', messageModel);
