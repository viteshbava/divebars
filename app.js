if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const methodOverride = require("method-override");

const Divebar = require("./models/Divebar");

// Initialize express
const app = express();
// Morgan for logging to console
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// Connect to DB
connectDB();
// parse body from forms
app.use(express.urlencoded({ extended: true }));
// method override
app.use(methodOverride("_method"));

//############################################################
// ROUTES
//############################################################

app.get("/divebars", async (req, res) => {
  const divebars = await Divebar.find({});
  res.render("divebars/index", { divebars });
});

app.get("/divebars/new", (req, res) => {
  res.render("divebars/new");
});
app.post("/divebars", async (req, res) => {
  const divebar = new Divebar(req.body.divebar);
  await divebar.save();
  res.redirect(`/divebars/${divebar._id}`);
});

app.get("/divebars/:id/edit", async (req, res) => {
  const divebar = await Divebar.findById(req.params.id);
  res.render("divebars/edit", { divebar });
});

app.get("/divebars/:id", async (req, res) => {
  const divebar = await Divebar.findById(req.params.id);
  res.render("divebars/show", { divebar });
});

app.put("/divebars/:id", async (req, res) => {
  const { id } = req.params;
  const divebar = await Divebar.findByIdAndUpdate(id, { ...req.body.divebar });
  res.redirect(`/divebars/${divebar._id}`);
});

app.delete("/divebars/:id", async (req, res) => {
  const { id } = req.params;
  await Divebar.findByIdAndDelete(id);
  res.redirect("/divebars");
});

app.get("/", (req, res) => {
  res.render("home");
});

//############################################################
// START SERVER AND LISTEN
//############################################################

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
