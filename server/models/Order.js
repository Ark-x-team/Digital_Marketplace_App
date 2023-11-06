const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true,
    },
    order_items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    order_date: {
        type: Date
    },
    cart_total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'archived', 'canceled'],
        default: 'open',
    },
})

const Product = mongoose.model('products', orderSchema)

module.exports = Product