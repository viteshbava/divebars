const mongoose = require("mongoose");
const Review = require("./Review");
const { Schema } = mongoose;

const diveBarSchema = new Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  map: String,
  capacity: { type: Number, min: 0 },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

diveBarSchema.post("findOneAndDelete", async (deletedDivebar) => {
  if (deletedDivebar && deletedDivebar.reviews.length) {
    await Review.deleteMany({ _id: { $in: deletedDivebar.reviews } });
  }
});

// LEAVING THIS HERE FOR WHEN I FIGURE OUT HOW TO TRIGGER IT PROPERLY
diveBarSchema.post("deleteOne", async (deletedDivebar) => {
  console.log("POST deleteOne triggered");
  console.log(deletedDivebar); // FOR SOME REASON THIS IS EMPTY, SO CANNOT BE USED...
  console.log("Use deletedDiveBar Id to delete reveiws here...");
});

module.exports = mongoose.model("Divebar", diveBarSchema);
