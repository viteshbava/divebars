const { divebarSchema } = require("../schemas.js");
const Divebar = require("../models/Divebar");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const ObjectId = require("mongodb").ObjectId;

const divebarExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    req.flash("error", `That divebar ID is invalid! (ID: ${id})`);
    return res.redirect("/divebars");
  }
  const divebar = await Divebar.findById(id);
  if (!divebar) {
    req.flash("error", `A divebar with that ID cannot be found! (ID: ${id})`);
    return res.redirect("/divebars");
  } else {
    res.locals.divebar = divebar;
    next();
  }
});

const validateDivebar = (req, res, next) => {
  const { error } = divebarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((e) => e.message).join(",\n");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = { validateDivebar, divebarExists };
