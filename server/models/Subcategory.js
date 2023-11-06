const mongoose = require('mongoose')

const SubcategorySchema = new mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categories' 
    },
    active: {
        type: Boolean,
        default: false
    },
})

const Subcategory = mongoose.model('subcategories', SubcategorySchema)

module.exports = Subcategory