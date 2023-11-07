const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const OrderItem = mongoose.model('order-items', orderItemSchema)

module.exports = OrderItem