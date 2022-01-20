const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/:name", async (req, res)=>{
    try {
        const products = await Product.find({category: req.params.name}).lean().exec();

        res.render("category", {products: products});
    } catch (error) {
        res.send(error);
    }

})

module.exports = router;