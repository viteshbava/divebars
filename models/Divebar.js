const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiveBarSchema = new Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  map: String,
  capacity: Number,
});

module.exports = mongoose.model("Divebar", DiveBarSchema);
