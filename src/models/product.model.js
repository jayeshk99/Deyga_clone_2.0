const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        
        productImgUrl2: [{type: String, required: true}],
        productName: {type: String, required: true},
        productRating: {type: String, required: true},
        totalReview: {type: Number, required: true},
        price: {type: Number, required: true},
        category: {type: String, required: true}
        
    }, 
    {
        versionKey: false,
        timestamps: true
    })

    module.exports = mongoose.model("product", productSchema);