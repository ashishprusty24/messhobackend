const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    brand: String,
    title : String,
    tribe: String,
    assecories:String,
    gender: String,
    size: String,
    image: String,
    category: String,
    color: String,
    price: Number,
    accessaries:String,
    strikeprice: Number
});

const productsMaodel = mongoose.model("product", productsSchema);

module.exports = productsMaodel;
