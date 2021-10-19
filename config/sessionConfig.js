const MongoStore = require("connect-mongo");

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI_DEV,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.MONGOSTORE_SECRET,
  },
});

store.on("error", function (e) {
  console.error("SESSION STORE ERROR", e);
});

module.exports = {
  store,
  name: "dvbrsssn",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // a week from today
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
