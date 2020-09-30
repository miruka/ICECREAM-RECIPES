const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter a Valid Email"],
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },

  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [6, "Minimum Length of passwprd is 6 Characters"],
  },
});

//Fires a function before doc or User saved to Database
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Fires up after user or doc is saved to Database
UserSchema.post("save", function (doc, next) {
  console.log("New User Was Created", doc);
  next();
});

module.exports = mongoose.model("User", UserSchema);
