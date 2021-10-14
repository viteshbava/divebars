module.exports = {
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
