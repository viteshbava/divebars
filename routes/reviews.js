const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, reviewExists } = require("../middleware/reviews");
const { divebarExists } = require("../middleware/divebars");
const { isLoggedIn, isAuthor } = require("../middleware/users");
const reviewsCtr = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, reviewsCtr.create);

router.delete(
  "/:reviewId",
  isLoggedIn,
  divebarExists,
  reviewExists,
  isAuthor("review"),
  reviewsCtr.delete
);

module.exports = router;
