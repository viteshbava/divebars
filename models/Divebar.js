const mongoose = require("mongoose");
const Review = require("./Review");
const { Schema } = mongoose;

const diveBarSchema = new Schema({
  title: String,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  image: String,
  capacity: { type: Number, min: 0 },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

diveBarSchema.post(
  "deleteOne",
  { document: true, query: false },
  async (deletedDivebar) => {
    if (deletedDivebar && deletedDivebar.reviews.length) {
      await Review.deleteMany({ _id: { $in: deletedDivebar.reviews } });
    }
  }
);

module.exports = mongoose.model("Divebar", diveBarSchema);
