module.exports = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong!";
  console.error(err);
  console.log(err.name);
  res.status(err.statusCode).render("error", { err });
};
