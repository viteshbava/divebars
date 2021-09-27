const Divebar = require("../models/Divebar");
const catchAsync = require("../utils/catchAsync");

module.exports.showAll = catchAsync(async (req, res) => {
  const divebars = await Divebar.find({});
  // if the description is greater than 200 characters, shorten it before sending back to the index page for display
  for (const d of divebars) {
    if (d.description.length > 200) {
      d.description = d.description.substring(0, 200) + " [...]";
    }
  }
  res.render("divebars/index", { divebars, nav_active: "divebars" });
});

module.exports.renderCreateForm = (req, res) => {
  res.render("divebars/new", { nav_active: "newDivebar" });
};

module.exports.create = catchAsync(async (req, res) => {
  const divebar = new Divebar(req.body.divebar);
  await divebar.save();
  req.flash("success", "Divebar created successfully!");
  res.redirect(`/divebars/${divebar._id}`);
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
  const divebar = await Divebar.findById(req.params.id);
  res.render("divebars/edit", { divebar });
});

module.exports.showOne = catchAsync(async (req, res) => {
  await res.locals.divebar.populate("reviews");
  res.render("divebars/show");
});

module.exports.update = catchAsync(async (req, res) => {
  const { id } = req.params;
  // await res.locals.divebar.updateOne(req.body.divebar);
  console.log(req.body.divebar);
  await Divebar.updateOne({ _id: id }, req.body.divebar);
  req.flash("success", "Divebar updated successfully!");
  res.redirect(`/divebars/${id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const me = await res.locals.divebar.deleteOne();

  // const me = await Divebar.deleteOne(res.locals.divebar);
  // await Divebar.deleteOne({ id: res.locals.divebar._id });
  // await Divebar.findByIdAndDelete(id);
  console.log("What was deleted?:");
  console.log(me);
  req.flash("success", "Divebar deleted successfully!");
  res.redirect("/divebars");
});
