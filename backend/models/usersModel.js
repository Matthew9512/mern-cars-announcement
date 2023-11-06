const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
   email: String,
   username: String,
   password: String,
   city: String,
   contactPerson: String,
   telNumber: String,
   announcements: [String],
});

module.exports = mongoose.model('user', usersSchema);
