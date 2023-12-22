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
    product_type: {
        type: String,
        enum: ['image', 'audio', 'video', 'pdf', 'font', 'text'],
        required: true,
    },
    product_files: {
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
        default: 0
    },
    short_description: {
        type: String,
        trim: true
    },
    long_description: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    hide: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    },
})

const Product = mongoose.model('products', productSchema)

module.exports = Product