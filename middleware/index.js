const { divebarSchema, reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");

const validateDivebar = (req, res, next) => {
  const { error } = divebarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((e) => e.message).join(",\n");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((e) => e.message).join(",\n");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const authenticate = (req, res, next) => {
  passport.authenticate("local", {
    // successFlash: `Welcome!`,
    // successRedirect: "/divebars",
    failureFlash: true,
    failureRedirect: "/login",
  })(req, res, next);
};

module.exports = { validateDivebar, validateReview, authenticate };
