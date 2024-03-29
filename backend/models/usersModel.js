const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
   email: String,
   username: String,
   password: String,
   city: String,
   created: { type: Date, default: Date.now },
   contactPerson: String,
   telNumber: String,
   announcements: [String],
   usersAvatar: String,
   unseenChats: [String],
});

module.exports = mongoose.model('user', usersSchema);
