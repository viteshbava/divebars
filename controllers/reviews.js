const Divebar = require("../models/Divebar");
const Review = require("../models/Review");

module.exports.create = async (req, res) => {
  const { id } = req.params;
  const divebar = await Divebar.findById(id);
  const review = new Review(req.body.review);
  divebar.reviews.push(review);
  await review.save();
  await divebar.save();
  req.flash("success", "Review created successfully!");
  res.redirect(`/divebars/${id}`);
};

module.exports.delete = async (req, res) => {
  const { id, reviewId } = req.params;
  await Divebar.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/divebars/${id}`);
};
