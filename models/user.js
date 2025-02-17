const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
// username, hashing, salting & hashed-password will be automatically implemented by this plugin

module.exports = mongoose.model("User", userSchema);
