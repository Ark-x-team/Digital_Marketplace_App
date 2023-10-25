const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
    },
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    product_images: {
        type: Array,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    discount_price: {type: mongoose.Schema.Types.Decimal128},
    short_description: {type: String},
    long_description: {type: String},
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