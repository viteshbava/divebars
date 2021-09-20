const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsync(users.register));

module.exports = router;
