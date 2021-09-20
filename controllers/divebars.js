const Divebar = require("../models/Divebar");

module.exports.showAll = async (req, res) => {
  const divebars = await Divebar.find({});
  // if the description is greater than 200 characters, shorten it before sending back to the index page for display
  for (const d of divebars) {
    if (d.description.length > 200) {
      d.description = d.description.substring(0, 200) + " [...]";
    }
  }
  res.render("divebars/index", { divebars, nav_active: "divebars" });
};

module.exports.renderCreateForm = (req, res) => {
  res.render("divebars/new", { nav_active: "newDivebar" });
};

module.exports.create = async (req, res) => {
  const divebar = new Divebar(req.body.divebar);
  await divebar.save();
  req.flash("success", "Campground created successfully!");
  res.redirect(`/divebars/${divebar._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const divebar = await Divebar.findById(req.params.id);
  res.render("divebars/edit", { divebar });
};

module.exports.showOne = async (req, res) => {
  const divebar = await Divebar.findById(req.params.id).populate("reviews");
  res.render("divebars/show", { divebar });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const divebar = await Divebar.findByIdAndUpdate(id, {
    ...req.body.divebar,
  });
  req.flash("success", "Campground updated successfully!");
  res.redirect(`/divebars/${divebar._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Divebar.findByIdAndDelete(id);
  req.flash("success", "Campground deleted successfully!");
  res.redirect("/divebars");
};
