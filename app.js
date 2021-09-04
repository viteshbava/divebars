if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const Divebar = require("./models/Divebar");

// Initialize express
const app = express();
// Morgan for logging to console
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
// Connect to DB
connectDB();
// server static folder
app.use(express.static(path.join(__dirname, "public")));
// parse body from forms
app.use(express.urlencoded({ extended: true }));
// method override
app.use(methodOverride("_method"));

//############################################################
// ROUTES
//############################################################

app.get(
  "/divebars",
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

app.get("/divebars/new", (req, res) => {
  res.render("divebars/new", { nav_active: "newDivebar" });
});
app.post(
  "/divebars",
  catchAsync(async (req, res) => {
    const divebar = new Divebar(req.body.divebar);
    await divebar.save();
    res.redirect(`/divebars/${divebar._id}`);
  })
);

app.get(
  "/divebars/:id/edit",
  catchAsync(async (req, res) => {
    const divebar = await Divebar.findById(req.params.id);
    res.render("divebars/edit", { divebar });
  })
);

app.get(
  "/divebars/:id",
  catchAsync(async (req, res) => {
    const divebar = await Divebar.findById(req.params.id);
    res.render("divebars/show", { divebar });
  })
);

app.put(
  "/divebars/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const divebar = await Divebar.findByIdAndUpdate(id, {
      ...req.body.divebar,
    });
    res.redirect(`/divebars/${divebar._id}`);
  })
);

app.delete(
  "/divebars/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Divebar.findByIdAndDelete(id);
    res.redirect("/divebars");
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

//############################################################
// CATCH ALL
//############################################################

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//############################################################
// ERROR ROUTE
//############################################################

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

//############################################################
// START SERVER AND LISTEN
//############################################################

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
