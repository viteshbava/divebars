const passport = require("passport");

const authenticate = (req, res, next) => {
  passport.authenticate("local", {
    // successFlash: `Welcome!`,
    // successRedirect: "/divebars",
    failureFlash: true,
    failureRedirect: "/login",
  })(req, res, next);
};

module.exports = { authenticate };
