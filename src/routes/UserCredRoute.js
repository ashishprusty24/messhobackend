const express = require("express");
const argon2 = require("argon2")
const jwt = require('jsonwebtoken')
const userCredModel = require("../model/userCredScheme");
const userCredRouter = express.Router();
// const userCredRoute = require("../schema/userCredScheme");

userCredRouter.get("/", async (req, res) => {
    let user = await userCredModel.find()
    res.send(user)
})

userCredRouter.get("/:id", async (req, res) => {
    try{
        let userEmail = await userCredModel.find({ email: req.params.id })
        if(userEmail.length>=1){           
            res.send(userEmail);
        }else{
            let user = await userCredModel.find({ _id: req.params.id })
            res.send(user)
        }      
    }catch(e){
     res.send("Credential Not Found")
    }

})

userCredRouter.post("/signup", async (req, res) => {
    let {email , password, name} = req.body
    try {
        let existingUser = await userCredModel.find({email:email});
        if(existingUser.length>1){
            return res.send("User already exist")
        }
        let hash = await argon2.hash(password)
        await userCredModel.create({email, hash , name})
        let jwttoken = jwt.sign({email, hash , name},"Bewkoof1")
        res.send(jwttoken)
    } catch (e) {
        res.send(e.message)
    }
})

userCredRouter.post("/login", async (req, res) => {
    let {email , password, name} = req.body
    try {
        let existingUser = await userCredModel.findOne({email:email});
        if(existingUser.length<1){
            return res.send("User does not exist")
        }
        // console.log(existingUser);
        // res.send("kuch V")
        const verify = await argon2.verify(existingUser.hash, password);
        if(verify){
            if(existingUser.email===email){
                return res.send("user Verified")
            }else{
                return res.send("credential does not match")
            }
        }else{
            return res.send("credential does not match")
        }
        // let hash = await argon2.hash(password)
        // await userCredModel.create({email, hash , name})
        // let jwttoken = jwt.sign({email, hash , name},"Bewkoof1")
        // res.send(jwttoken)
    } catch (e) {
        res.send(e.message)
    }
})

userCredRouter.delete("/:id", async (req, res) => {
    try {
        let user = await userCredModel.deleteOne({ _id: req.params.id })
        res.send(user)
    } catch (e) {
        res.send(e.message)
        console.log(req.body);
    }
})

module.exports = userCredRouter