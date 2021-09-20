const User = require("../models/User");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register", { nav_active: "register" });
};

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email });
  const newUser = await User.register(user, password);
  res.send(newUser);
};
