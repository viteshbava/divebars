if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../config/.env" });
}

const mongoose = require("mongoose");
const Divebar = require("../models/Divebar");
const Review = require("../models/Review");

async function runSeedingScript() {
  try {
    await require("../config/db")(process.env.MONGO_URI);
    // await populateDiveBarAuthors();
    // await populateReviewAuthors();
    // await deleteMap();
    mongoose.connection.close();
    console.log("MongooseDB connection closed");
  } catch (err) {
    console.log("OOPS!  Something went wrong...");
    console.log(err);
    mongoose.connection.close();
    console.log("MongooseDB connection closed");
  }
}

async function populateDiveBarAuthors() {
  const result = await Divebar.updateMany(
    {},
    { author: "614948710883fce738d856f0" }
  );
  console.log("Update complete. Results:");
  console.log(result);
}

async function populateReviewAuthors() {
  const result = await Review.updateMany(
    {},
    { author: "614bf0df0928aceb444737b6" }
  );
  console.log("Update complete. Results:");
  console.log(result);
}

async function deleteMap() {
  const result = await Divebar.updateMany({}, { $unset: { map: "" } });
  console.log("Update complete. Results:");
  console.log(result);
}

runSeedingScript();
