const ExpressError = require("../utils/ExpressError");

module.exports.renderHome = (req, res, next) => {
  res.render("home");
};

module.exports.pageNotFound = (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
};
