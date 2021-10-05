const passport = require("passport");
const ExpressError = require("../utils/ExpressError");

const authenticate = (req, res, next) => {
  passport.authenticate("local", {
    // successFlash: `Welcome!`,
    // successRedirect: "/divebars",
    failureFlash: true,
    failureRedirect: "/login",
  })(req, res, next);
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnToUrl = req.originalUrl; // remember where to come back to
    req.flash("info", "Please login to do that.");
    return res.redirect("/login");
  } else next();
};

const isAuthor = (entity) => {
  return (req, res, next) => {
    if (!res.locals[entity])
      throw new ExpressError(
        `Invalid entity passed to isAuthor middleware: ${entity}`,
        400
      );
    if (!res.locals[entity].author.equals(req.user._id)) {
      req.flash("error", `You do not have permission to perform that action!`);
      return res.redirect(`/divebars/${res.locals.divebar._id}`);
    } else next();
  };
};

module.exports = {
  authenticate,
  isLoggedIn,
  isAuthor,
};
