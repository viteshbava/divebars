const Divebar = require("../models/Divebar");
const Review = require("../models/Review");
const catchAsync = require("../utils/catchAsync");

module.exports.create = catchAsync(async (req, res) => {
  const { id } = req.params;
  // create review
  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();
  // update corresponding divebar
  const divebar = await Divebar.findById(id);
  divebar.reviews.push(review);
  await divebar.save();
  req.flash("success", "Review created successfully!");
  res.redirect(`/divebars/${id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  const { divebar, review } = res.locals;
  await divebar.updateOne({ $pull: { reviews: reviewId } });
  await review.deleteOne();
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/divebars/${id}`);
});
