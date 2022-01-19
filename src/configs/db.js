/** @format */

const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://atul:1234@cluster0.3ginc.mongodb.net/Deyga_clone"
  );
};
