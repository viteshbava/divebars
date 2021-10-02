const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, reviewExists } = require("../middleware/reviews");
const { divebarExists } = require("../middleware/divebars");
const { isLoggedIn } = require("../middleware/users");
const reviewsCtr = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, reviewsCtr.create);

router.delete(
  "/:reviewId",
  isLoggedIn,
  divebarExists,
  reviewExists,
  reviewsCtr.delete
);

module.exports = router;
