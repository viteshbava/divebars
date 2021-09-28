const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, reviewExists } = require("../middleware/reviews");
const { divebarExists } = require("../middleware/divebars");
const reviewsCtr = require("../controllers/reviews");

router.post("/", validateReview, reviewsCtr.create);

router.delete("/:reviewId", divebarExists, reviewExists, reviewsCtr.delete);

module.exports = router;
