const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const users = require("../controllers/users");
const { authenticate } = require("../middleware");

router.route("/register").get(users.renderRegisterForm).post(users.register);

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(authenticate, users.login);

module.exports = router;
