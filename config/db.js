const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connect to db
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI_DEV);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Failed to connect ot MongoDB!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
