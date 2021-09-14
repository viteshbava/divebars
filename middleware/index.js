const { divebarSchema, reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");

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

module.exports = { validateDivebar, validateReview };
