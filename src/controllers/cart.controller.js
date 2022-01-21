const express = require("express");

const router = express.Router();

const Cart = require("../models/cart.model")
const authentication = require("../middlewares/authentication")

router.post("", async (req, res)=>{
    try {
        const cart = Cart.create(req.body);
        return res.send(cart);
    } catch (error) {
        res.send({error: error})
    }
})

router.get("", authentication, async (req, res)=>{
    try {
        const cart = Cart.findById({_id: req.user._id}).lean().exec();
        return res.send(cart);
    } catch (error) {
        res.send({error: error})
    }
})

router.patch("", authentication, async(req, res)=>{
    try {
        let product = req.body;
        console.log(product)
        const cart = Cart.findByIdAndUpdate(
            {user_id: user._id},
            {products: [product._id]});
        console.log(cart);
        return res.send(cart);

    } catch (error) {
        res.send({error: error})
    }
})
module.exports = router;