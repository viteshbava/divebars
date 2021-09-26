const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview } = require("../middleware/reviews");
const reviewsCtr = require("../controllers/reviews");

router.post("/", validateReview, reviewsCtr.create);

router.delete("/:reviewId", reviewsCtr.delete);

module.exports = router;
