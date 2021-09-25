const express = require("express");
const router = express.Router();
const { validateDivebar } = require("../middleware");
const divebars = require("../controllers/divebars");
const catchAsync = require("../utils/catchAsync");

router
  .route("/")
  .get(catchAsync(divebars.showAll))
  .post(validateDivebar, catchAsync(divebars.create));

router.get("/new", divebars.renderCreateForm);

router.get("/:id/edit", catchAsync(divebars.renderEditForm));

router
  .route("/:id")
  .get(catchAsync(divebars.showOne))
  .put(validateDivebar, catchAsync(divebars.edit))
  .delete(catchAsync(divebars.delete));

module.exports = router;
