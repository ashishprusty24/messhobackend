const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors');
const productsRouter = require("./src/routes/products.route");
const userDataRouter = require("./src/routes/cart.route");
const userCredRouter = require("./src/routes/UserCredRoute");
const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/cart", userDataRouter)
app.use("/usercred", userCredRouter)
app.use("/products", productsRouter)

app.listen(PORT, () => {
    mongoose.connect("mongodb+srv://bewkoof:bewkoof123@cluster0.vriblg0.mongodb.net/test")
    console.log("working");
})
