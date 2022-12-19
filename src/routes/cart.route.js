const express = require("express");
const userCartModel = require("../model/userCartSchema");
const userCartRouter = express.Router();

userCartRouter.get("/", async (req, res) => {
    let products = await userCartModel.find().populate("cred"
    , {
        password: 0, email:0, name:0, __v: 0
    })
    res.send(products)
})

userCartRouter.get("/:id", async (req, res) => {
    try {
        let products = await userCartModel.find({ cred: { _id: req.params.id } })
        if (products.length < 1) {
            let products2 = await userCartModel.find({ _id: req.params.id })
            res.send(products2);
        } else {
            res.send(products);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
})

userCartRouter.post("/", async (req, res) => {
    try {
        let product= await userCartModel.create(req.body)
        res.send(product);
    } catch (e) {
        res.send(e.message)
    }
})

userCartRouter.delete("/:id", async (req, res) => {
    try {     
            let product= await userCartModel.deleteOne({ _id: req.params.id })
            res.send(product);

    } catch (e) {
        res.status(401).send(e.message)
    }
})

userCartRouter.patch("/:id", async (req, res) => {
    try {
        let product = await userCartModel.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
        res.send(product)
    } catch (e) {
        res.status(401).send(e.message);
    }
})

module.exports = userCartRouter