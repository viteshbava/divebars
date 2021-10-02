const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register", { nav_active: "register" });
};

module.exports.register = catchAsync(async (req, res) => {
  // Could potentially remove catchAsync since we are manually putting in the try/catch, since we want to flash errors comming from User.register.
  const { displayName, email, password } = req.body.user;
  const user = new User({ displayName, email });
  try {
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) throw err;
      req.flash("success", `Welcome ${displayName}! You are registered!`);
      res.redirect("/divebars");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register/");
  }
});

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login", { nav_active: "login" });
};

module.exports.login = (req, res) => {
  req.flash("success", `Welcome back ${req.user.displayName}!`);
  const redirectUrl = req.session.returnToUrl || "/divebars";
  delete req.session.returnToUrl;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Logout successful - goodbye!");
  res.redirect("/divebars");
};
