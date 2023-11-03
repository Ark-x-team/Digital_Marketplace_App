const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    valid_account: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    last_login: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
    }
})

const Customer = mongoose.model('customers', customerSchema)

module.exports = Customer