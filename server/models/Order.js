const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true,
    },
    order_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order-items',
        required: true,
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    cart_total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'canceled'],
        default: 'pending',
    },
})

const Order = mongoose.model('orders', orderSchema)

module.exports = Order