const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Divebar = require("../models/Divebar");
const Review = require("../models/Review");
const router = express.Router({ mergeParams: true });
const { validateReview } = require("../middleware");

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const divebar = await Divebar.findById(id);
    const review = new Review(req.body.review);
    divebar.reviews.push(review);
    await review.save();
    await divebar.save();
    res.redirect(`/divebars/${id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Divebar.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/divebars/${id}`);
  })
);

module.exports = router;
