const express = require("express");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });
const { validateReview } = require("../middleware/reviews");

router.post("/", validateReview, catchAsync(reviews.create));

router.delete("/:reviewId", catchAsync(reviews.delete));

module.exports = router;
