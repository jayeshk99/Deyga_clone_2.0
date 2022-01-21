const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");


router.get("/:name",  async (req, res)=>{
    try {
        const products = await Product.find({category: req.params.name}).lean().exec();
        
        res.render("category", {products: products});
    } catch (error) {
        res.send(error);
    }

})
router.get("/productDetail/:_id", async (req, res)=>{
    try {

        const product = await Product.findOne({_id: req.params._id}).lean().exec();
        // localStorage.setItem("clickedProduct", JSON.stringify(product))
        res.render("productDetail", {product: product});
    } catch (error) {
        
    }
})
module.exports = router;