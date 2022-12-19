const express = require("express");
const productsMaodel = require("../model/products.Schema");
const mobileRouter = express.Router();

mobileRouter.get("/", async (req, res) => {
    try {
        let products = await productsMaodel.find()
        res.send(products)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

mobileRouter.get("/:id", async (req, res) => {
    try {
        let product = await productsMaodel.find({ _id: req.params.id })
        res.send(product);
    } catch (e) {
        res.status(404).send(e.message);
    }
})

mobileRouter.post("/mobile", async (req, res) => {
    try {
        let products = await productsMaodel.find({accessaries:"mobile"})   
        if(products.length>1){
            res.send(products)
        }else{
            res.send("No product found")
        }
        
    } catch (e) {
        res.status(404).send(e.message)
    }
})


mobileRouter.delete("/:id", async (req, res) => {
    try {
            let product = await productsMaodel.deleteOne({ _id: req.params.id })
            res.send(product)       

    } catch (e) {
        res.status(401).send(e.message)
    }
})


module.exports = mobileRouter