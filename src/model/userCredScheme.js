const mongoose = require("mongoose");

const userCredRoute = new mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  name: { type: String },
});

const userCredModel = mongoose.model("userCred", userCredRoute);

module.exports = userCredModel;
