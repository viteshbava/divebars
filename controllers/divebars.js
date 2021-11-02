const Divebar = require("../models/Divebar");
const catchAsync = require("../utils/catchAsync");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: MAPBOX_TOKEN });

module.exports.showAll = catchAsync(async (req, res) => {
  const divebars = await Divebar.find({}).populate("author");
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
  // add Mapbox geometry
  divebar.geometry = await getGeoData(req.body.divebar.location);
  // add images for Cloudinary
  // { CODE WILL GO HERE }
  divebar.author = req.user._id;
  await divebar.save();
  req.flash("success", "Divebar created successfully!");
  res.redirect(`/divebars/${divebar._id}`);
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
  const divebar = await Divebar.findById(req.params.id);
  res.render("divebars/edit", { divebar });
});

module.exports.showOne = catchAsync(async (req, res) => {
  await res.locals.divebar.populate([
    {
      path: "reviews",
      populate: { path: "author", select: "displayName" },
    },
    "author",
  ]);
  // if geometry does not exist, get it
  if (!res.locals.divebar.geometry.type) {
    res.locals.divebar.geometry = await getGeoData(res.locals.divebar.location);
    // MAYBE WE SHOULD/COULD SAVE THE GEOMETRY TO THE DOC ON MONGO WHILE WE'RE HERE?
  }
  res.render("divebars/show");
});

module.exports.update = catchAsync(async (req, res) => {
  const { id } = req.params;
  await res.locals.divebar.updateOne(req.body.divebar);
  req.flash("success", "Divebar updated successfully!");
  res.redirect(`/divebars/${id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  await res.locals.divebar.deleteOne();
  req.flash("success", "Divebar deleted successfully!");
  res.redirect("/divebars");
});

async function getGeoData(location) {
  const geoData = await geocoder
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();
  return geoData.body.features[0]
    ? geoData.body.features[0].geometry
    : { type: "Point", coordinates: [] };
}
