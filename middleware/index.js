const ObjectId = require("mongodb").ObjectId;

const isIdValid = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    req.flash("error", `That divebar ID is invalid! (ID: ${id})`);
    return res.redirect("/divebars");
  } else next();
};

module.exports = { isIdValid };
