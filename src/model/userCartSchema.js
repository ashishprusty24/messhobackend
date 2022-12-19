const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  brand: String,
  title : String,
  tribe: String,
  gender: String,
  size: String,
  image: String,
  category: String,
  color: String,
  price: Number,
  strikeprice: Number,
  cred:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCred",
  },
});

const userCartModel = mongoose.model("userCart", cartSchema);

module.exports = userCartModel;
