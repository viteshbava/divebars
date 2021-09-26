const express = require("express");
const router = express.Router();
const { isIdValid } = require("../middleware");
const { validateDivebar } = require("../middleware/divebars");
const divebars = require("../controllers/divebars");

router.route("/").get(divebars.showAll).post(validateDivebar, divebars.create);

router.get("/new", divebars.renderCreateForm);

router.get("/:id/edit", divebars.renderEditForm);

router
  .route("/:id")
  .get(isIdValid, divebars.showOne)
  .put(isIdValid, validateDivebar, divebars.update)
  .delete(isIdValid, divebars.delete);

module.exports = router;
