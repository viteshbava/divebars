const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiveBarSchema = new Schema({
  title: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Divebar", DiveBarSchema);
