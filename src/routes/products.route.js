const express = require("express");
const productsMaodel = require("../model/products.Schema");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
    try {
        let products = await productsMaodel.find()
        res.send(products)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

productsRouter.get("/:id", async (req, res) => {
    try {
        let product = await productsMaodel.find({ _id: req.params.id })
        res.send(product);
    } catch (e) {
        res.status(404).send(e.message);
    }
})

productsRouter.post("/gender", async (req, res) => {
    try {
        let {gender} = req.body
        let products = await productsMaodel.find({gender:gender})   
        if(products.length>1){
            res.send(products)
        }else{
            res.send("No product found")
        }
        
    } catch (e) {
        res.status(404).send(e.message)
    }
})


productsRouter.post("/", async (req, res) => {
    try {
        let product = await productsMaodel.create(req.body)
        res.send(product);
    } catch (e) {
        res.send(e.message)
    }
})

productsRouter.delete("/:id", async (req, res) => {
    try {
            let product = await productsMaodel.deleteOne({ _id: req.params.id })
            res.send(product)       

    } catch (e) {
        res.status(401).send(e.message)
    }
})

productsRouter.patch("/:id", async (req, res) => {
    try {
        let user = await productsMaodel.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
        res.send(user)
    } catch (e) {
        res.status(401).send(e.message);
        console.log("something");
    }
})

module.exports = productsRouter