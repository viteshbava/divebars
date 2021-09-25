const express = require("express");
const router = express.Router();
const { validateDivebar } = require("../middleware");
const divebars = require("../controllers/divebars");

router.route("/").get(divebars.showAll).post(validateDivebar, divebars.create);

router.get("/new", divebars.renderCreateForm);

router.get("/:id/edit", divebars.renderEditForm);

router
  .route("/:id")
  .get(divebars.showOne)
  .put(validateDivebar, divebars.update)
  .delete(divebars.delete);

module.exports = router;
