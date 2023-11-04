const mongoose = require('mongoose');

const connectDB = async function () {
   try {
      await mongoose.connect(`${process.env.MONGO_DB}`);
   } catch (error) {
      console.log(error.message);
      // mongoose.connection.close;
      //      SEND STATUS CODE AND MESSAGE
   }
};

module.exports = connectDB;
