const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
    unique: true,
  },
});

// create authentication logic using "local" strategy
const LOCAL_OPTIONS = {
  usernameField: "email",
  errorMessages: {
    UserExistsError: "A user with the given email is already registered.",
  },
};
UserSchema.plugin(passportLocalMongoose, LOCAL_OPTIONS);

// Set custom error for Display Name
UserSchema.post("save", function (error, user, next) {
  if (
    error.name === "MongoServerError" &&
    error.code === 11000 &&
    error.keyValue.displayName
  ) {
    next(
      new Error("A user with the given Display Name is already registered.")
    );
  } else {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
