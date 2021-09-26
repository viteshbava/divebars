const { divebarSchema } = require("../schemas.js");
const Divebar = require("../models/Divebar");
const catchAsync = require("../utils/catchAsync");
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

const findDiveBar = catchAsync(async (req, res, next) => {
  const divebar = await Divebar.findById(id);
  if (!divebar) {
    req.flash("error", `A divebar with that ID cannot be found! (ID: ${id})`);
    res.redirect("/divebars");
  } else {
    res.locals.divebar = divebar;
    next();
  }
});

module.exports = { validateDivebar };
