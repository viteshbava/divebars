const returnToUrl = (req, res, next) => {
  // if we have a returnToUrl and the current url being directed to is /login, it means we have been redirected here because we were trying to do something we needed to be logged in for.  In this case, keep the returnToUrl as it will be used if login is successful.
  // if we have a returnToUrl but the current url being directed to is NOT /login (i.e. exacty what the folliwng if statement checks for), it means were on the login page after being redirected there, but we didn't log in and instead went somewhere else.  In this case, clear the returnToUrl (so if we then do decide to login afterwards, we don't unexpectedly get taken back to the previous attempted page)
  if (req.session.returnToUrl && req.originalUrl !== "/login")
    delete req.session.returnToUrl;
  next();
};

const resLocals = (req, res, next) => {
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

module.exports = { returnToUrl, resLocals };
