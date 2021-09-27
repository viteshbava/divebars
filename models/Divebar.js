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

diveBarSchema.pre("save", async () => {
  console.log("about to save!");
});
diveBarSchema.post("save", async () => {
  console.log("just saved!");
});

diveBarSchema.pre("findOneAndDelete", async (deletedDivebar) => {
  console.log("PRE!! lets delete the reviews for that bar if there are any!");
  console.log(deletedDivebar);
});
diveBarSchema.post("findOneAndDelete", async (deletedDivebar) => {
  console.log("POST lets delete the reviews for that bar if there are any!");
  console.log(deletedDivebar);
  // if (deletedDivebar && deletedDivebar.reviews.length) {
  //   await Review.deleteMany({ _id: { $in: deletedDivebar.reviews } });
  // }
});

module.exports = mongoose.model("Divebar", diveBarSchema);
