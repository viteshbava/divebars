if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
require("./config/db")(process.env.MONGO_URI);
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig")({
  mongoUrl: process.env.MONGO_URI,
  mongoStoreSecret: process.env.MONGOSTORE_SECRET,
  expSessionSecret: process.env.SESSION_SECRET,
  secure: process.env.NODE_ENV === "production" ? true : false,
});
const flash = require("connect-flash");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const CSP = require("./config/contentSecurityPolicy");
const passport = require("passport");
const User = require("./models/User");
const { returnToUrl, resLocals } = require("./middleware/globals");
const divebarRoutes = require("./routes/divebars");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const indexRoutes = require("./routes");
const errorRoute = require("./routes/error");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

//############################################################
// GLOBAL MIDDLEWARE
//############################################################

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
app.use(helmet.contentSecurityPolicy(CSP));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(mongoSanitize());
app.use(returnToUrl);
app.use(resLocals);

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
app.use(errorRoute);

//############################################################
// START SERVER AND LISTEN
//############################################################

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
