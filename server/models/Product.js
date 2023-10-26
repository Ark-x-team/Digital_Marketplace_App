const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    product_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    product_images: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
        set: num => Number(num).toFixed(2),
    },
    discount_price: {
        type: Number,
        set: num => Number(num).toFixed(2),
    },
    short_description: {
        type: String,
        trim: true
    },
    long_description: {
        type: String,
        trim: true
    },
    options: {type: Array},
    active: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
    },
    // subcategory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
})

const Product = mongoose.model('products', productSchema)

module.exports = Product