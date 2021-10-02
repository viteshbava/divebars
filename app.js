if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const divebarRoutes = require("./routes/divebars");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const indexRoutes = require("./routes");

// Initialize express

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

const sessionConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // a week from today
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// global locals variables passed into every response
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.alerts = {
    success: req.flash("success"),
    info: req.flash("info"),
    error: req.flash("error"),
  };
  next();
});

//############################################################
// ROUTES
//############################################################

app.use("/divebars", divebarRoutes);
app.use("/divebars/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
app.use("/", indexRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//############################################################
// ERROR ROUTE
//############################################################

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong!";
  console.error(err);
  console.log(err.name);
  res.status(err.statusCode).render("error", { err });
});

//############################################################
// START SERVER AND LISTEN
//############################################################

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
