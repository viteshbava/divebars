const passport = require("passport");

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

module.exports = {
  authenticate,
  isLoggedIn,
};
