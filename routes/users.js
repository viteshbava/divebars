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

router.post("/logout", usersCtr.logout); // use POST for logout to follow best practices.  Will need to ensure logout html element is wrapped in a Form configured to send POST request.

module.exports = router;
