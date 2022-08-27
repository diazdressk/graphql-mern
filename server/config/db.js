const mongoose = require('mongoose');

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Mongo Connected: ${connect.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
