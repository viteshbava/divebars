const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError");

router.get("/", (req, res, next) => {
  res.render("home");
});

// CATCH ALL
router.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

module.exports = router;
