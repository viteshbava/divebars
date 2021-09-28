const { reviewSchema } = require("../schemas.js");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/Review");
const ExpressError = require("../utils/ExpressError");
const ObjectId = require("mongodb").ObjectId;

const reviewExists = catchAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;
  // check review id is valid
  if (!ObjectId.isValid(reviewId)) {
    req.flash("error", `That reivew ID is invalid! (ID: ${reviewId})`);
    return res.redirect(`/divebars/${id}`);
  }
  // check the review exists in the database
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash(
      "error",
      `A review with that ID cannot be found! (ID: ${reviewId})`
    );
    return res.redirect(`/divebars/${id}`);
  }
  // check the review exits on the given divebar
  const reviewIndex = res.locals.divebar.reviews.indexOf(reviewId);
  if (reviewIndex < 0) {
    req.flash("error", "That review does not belong to that divebar!");
    return res.redirect(`/divebars/${id}`);
  }
  res.locals.review = review;
  next();
});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((e) => e.message).join(",\n");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = { validateReview, reviewExists };
