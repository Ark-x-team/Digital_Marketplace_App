const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
})

const Category = mongoose.model('categories', categorySchema)

module.exports = Category