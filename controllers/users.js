const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register", { nav_active: "register" });
};

module.exports.register = catchAsync(async (req, res) => {
  const { displayName, email, password } = req.body.user;
  const user = new User({ displayName, email });
  const newUser = await User.register(user, password);
  res.redirect("/divebars");
});
// module.exports.register = async (req, res) => {
//   const { displayName, email, password } = req.body.user;
//   const user = new User({ displayName, email });
//   const newUser = await User.register(user, password);
//   res.redirect("/divebars");
// };

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login", { nav_active: "login" });
};

module.exports.login = (req, res) => {
  req.flash("success", `Welcome back ${req.user.displayName}!`);
  res.redirect("/divebars");
};
