if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const divebarRoutes = require("./routes/divebars");
const reviewRoutes = require("./routes/reviews");
const indexRoutes = require("./routes");

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

app.use("/divebars", divebarRoutes);
app.use("/divebars/:id/reviews", reviewRoutes);
app.use("/", indexRoutes);

//############################################################
// ERROR ROUTE
//############################################################

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong!";
  console.error(err);
  res.status(err.statusCode).render("error", { err });
});

//############################################################
// START SERVER AND LISTEN
//############################################################

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
