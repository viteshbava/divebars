if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
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
const sessionConfig = require("./config/sessionConfig");
const flash = require("connect-flash");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const CSP = require("./config/csp");

const passport = require("passport");
const User = require("./models/User");

const divebarRoutes = require("./routes/divebars");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const indexRoutes = require("./routes");

// Morgan for logging to console
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
app.use(helmet(CSP));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(mongoSanitize());

// global locals variables passed into every response
app.use((req, res, next) => {
  // if we have a returnToUrl and the current url being directed to is /login, it means we have been redirected here because we were trying to do something we needed to be logged in for.  In this case, keep the returnToUrl as it will be used if login is successful.
  // if we have a returnToUrl but the current url being directed to is NOT /login (i.e. exacty what the folliwng if statement checks for), it means were on the login page after being redirected there, but we didn't log in and instead went somewhere else.  In this case, clear the returnToUrl (so if we then do decide to login afterwards, we don't unexpectedly get taken back to the previous attempted page)
  if (req.session.returnToUrl && req.originalUrl !== "/login")
    delete req.session.returnToUrl;
  // store the current user
  res.locals.currentUser = req.user;
  // store flash alerts
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
