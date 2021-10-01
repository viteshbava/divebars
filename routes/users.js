const express = require("express");
const router = express.Router();
const usersCtr = require("../controllers/users");
const { authenticate } = require("../middleware/users");

router
  .route("/register")
  .get(usersCtr.renderRegisterForm)
  .post(usersCtr.register);

router
  .route("/login")
  .get(usersCtr.renderLoginForm)
  .post(authenticate, usersCtr.login);

router.get("/logout", usersCtr.logout);

module.exports = router;
