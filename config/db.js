const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connect to db
    const conn = await mongoose.connect(process.env.MONGO_URI_PROD);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
