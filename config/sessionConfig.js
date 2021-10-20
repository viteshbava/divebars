const MongoStore = require("connect-mongo");

module.exports = ({ mongoUrl, mongoStoreSecret, expSessionSecret }) => {
  const store = MongoStore.create({
    mongoUrl,
    touchAfter: 24 * 60 * 60,
    crypto: { secret: mongoStoreSecret },
  });

  store.on("error", function (e) {
    console.error("SESSION STORE ERROR", e);
  });

  return {
    store,
    name: "dvbrsssn",
    secret: expSessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // a week from today
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
};
