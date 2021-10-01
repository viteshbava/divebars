const express = require("express");
const router = express.Router();
const { divebarExists, validateDivebar } = require("../middleware/divebars");
const { isLoggedIn } = require("../middleware/users");
const divebarsCtr = require("../controllers/divebars");

router
  .route("/")
  .get(divebarsCtr.showAll)
  .post(isLoggedIn, validateDivebar, divebarsCtr.create);

router.get("/new", isLoggedIn, divebarsCtr.renderCreateForm);

router.get("/:id/edit", isLoggedIn, divebarsCtr.renderEditForm);

router
  .route("/:id")
  .get(divebarExists, divebarsCtr.showOne)
  .put(isLoggedIn, divebarExists, validateDivebar, divebarsCtr.update)
  .delete(isLoggedIn, divebarExists, divebarsCtr.delete);

module.exports = router;
