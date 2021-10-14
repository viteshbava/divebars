const express = require("express");
const app = express();
const helmet = require("helmet");

// https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22348128#questions/15299690

// Define the URL lists
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const imgSrcUrls = [
  "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22348128#questions/13143940  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  "https://images.unsplash.com/",
];
const fontSrcUrls = [];

// Use Helmet
const useHelmet = () => {
  console.log("hello");
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: ["'self'", "blob:", "data:", ...imgSrcUrls],
        fontSrc: ["'self'", ...fontSrcUrls],
      },
    })
  );
};

module.exports = useHelmet;
