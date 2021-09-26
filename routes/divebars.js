const express = require("express");
const router = express.Router();
const { divebarExists, validateDivebar } = require("../middleware/divebars");
const divebarsCtr = require("../controllers/divebars");

router
  .route("/")
  .get(divebarsCtr.showAll)
  .post(validateDivebar, divebarsCtr.create);

router.get("/new", divebarsCtr.renderCreateForm);

router.get("/:id/edit", divebarsCtr.renderEditForm);

router
  .route("/:id")
  .get(divebarExists, divebarsCtr.showOne)
  .put(divebarExists, validateDivebar, divebarsCtr.update)
  .delete(divebarExists, divebarsCtr.delete);

module.exports = router;
