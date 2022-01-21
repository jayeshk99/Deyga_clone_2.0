const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: false},
        products: [{type: mongoose.Schema.Types.ObjectId, ref: "product", required: false}]
    }
)

module.exports = mongoose.model("cart", cartSchema);