const mongoose = require("mongoose");

const connectDB = async (mongoUrl) => {
  try {
    // connect to db
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Failed to connect ot MongoDB!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
