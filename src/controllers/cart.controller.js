const express = require("express");

const router = express.Router();

const Cart = require("../models/cart.model")
const authentication = require("../middlewares/authentication")

router.get("", authentication, async (req, res)=>{
    try {

        const cart =await Cart.findOne({user_id: req.user._id}).populate("products").lean().exec();
        return res.send(cart);
    } catch (error) {
        res.send({error: error})
    }
})


router.post("", async (req, res)=>{
    try {
        const cart =await Cart.create(req.body);
        return res.send(cart);
    } catch (error) {
        res.send({error: error})
    }
})

router.patch("/deleteProduct", authentication, async(req, res)=>{
 
    try {

        // const cart =await Cart.findOneAndUpdate({userid : req.params.userId}, { $pull: { products : {productid: req.params.productId }}}, {multi: true})

        const cart = await Cart.findOneAndUpdate({user_id: req.user._id}, {products: req.body});
        res.send(cart);
    } catch (error) {
        res.send({error: error})
    }
})

router.patch("", authentication, async(req, res)=>{
    try {
        let product = req.body;

        const cart =await Cart.findOneAndUpdate(
         {user_id: req.user._id},
           {$push: {products: product._id}}, {new: true});
        return res.send(cart);

    } catch (error) {
        res.send({error: error})
    }
})


module.exports = router;