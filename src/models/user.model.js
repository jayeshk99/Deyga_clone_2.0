/** @format */

// Create a user collection which has following fields

// name => string, required: true
// email => string, required: true
// password => string, required: true
// profile_photo_url => string, required: false
// roles => array of strings, required: true ( Possible roles are :- "student", "ia", "teacher", "operations", "admin")
// timestamps

const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("user", userSchema);
