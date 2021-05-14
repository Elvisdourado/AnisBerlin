const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 500 },
    glutenFree: { type: String, enum: ["yes", "no"], required: true },
    lactoseFree: { type: String, enum: ["yes", "no"], required: true },
    sugarFree: { type: String, enum: ["yes", "no"], required: true },
    caseinFree: { type: String, enum: ["yes", "no"], required: true },
    vegan: { type: String, enum: ["yes", "no"], required: true },
    price: { type: Number, required: true },
    image_url: { type: String },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
    
})

module.exports = mongoose.model("Product", ProductSchema)