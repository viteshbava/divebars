const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const Divebar = require("../models/Divebar");
const { validateDivebar } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const divebars = await Divebar.find({});
    // if the description is greater than 200 characters, shorten it before sending back to the index page for display
    for (const d of divebars) {
      if (d.description.length > 200) {
        d.description = d.description.substring(0, 200) + " [...]";
      }
    }
    res.render("divebars/index", { divebars, nav_active: "divebars" });
  })
);

router.get("/new", (req, res) => {
  res.render("divebars/new", { nav_active: "newDivebar" });
});

router.post(
  "/",
  validateDivebar,
  catchAsync(async (req, res) => {
    const divebar = new Divebar(req.body.divebar);
    await divebar.save();
    res.redirect(`/divebars/${divebar._id}`);
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const divebar = await Divebar.findById(req.params.id);
    res.render("divebars/edit", { divebar });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const divebar = await Divebar.findById(req.params.id).populate("reviews");
    res.render("divebars/show", { divebar });
  })
);

router.put(
  "/:id",
  validateDivebar,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const divebar = await Divebar.findByIdAndUpdate(id, {
      ...req.body.divebar,
    });
    res.redirect(`/divebars/${divebar._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Divebar.findByIdAndDelete(id);
    res.redirect("/divebars");
  })
);

module.exports = router;
