module.exports = (req, res, next) => {
  // store the current user
  res.locals.currentUser = req.user;
  // store flash alerts
  res.locals.alerts = {
    success: req.flash("success"),
    info: req.flash("info"),
    error: req.flash("error"),
  };
  next();
};
