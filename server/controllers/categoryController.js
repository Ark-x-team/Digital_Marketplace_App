const Category = require("../models/Category"); 

// ******************************* Create category ************************************
const createCategory = async (req, res) => {
    try {
        // Get category data
        const category_name = req.body.category_name; 

        // Check category existence 
        const categoryExist = await Category.findOne({ category_name });
        if (categoryExist) {
            return res.status(400).json({
                status: 400,
                message: "Category already exists"
            })
        } else {
            // Post category data
            const category = await Category.create({ category_name })
            res.status(200).json({ status: 200, message: "Category created successfully" })
        }
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to create category"})
    }   
}

// ****************************** List all categories *********************************
const getCategories = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all categories with limit number per page and sort them by creation date.
        const categories = await Category.find()
            .limit(limit).skip(skip).sort({ 'category_name': -1 });
        const count = categories.length

        // Check the existence of categories for each page
        if (count < 1) {
            res.status(404).json({ status: 404, data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: categories})
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get categories"})
    }
};

// ******************************* Get one category ***********************************
const getCategory = async (req, res) => {
    try {
        // Get category id from request params
        const categoryId = req.params.id; 
        
        // Find category by it's id
        const category = await Category.findById(categoryId); 
        res.status(200).json({status: 200, data : category})
    } catch (error) {
        res.status(404).json({status: 404, message: "Category not found"})
    }
};

// **************************** Search for categories *********************************
const searchCategories = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get search query and add regex
        const searchQuery = req.query.search_query; 
        const searchQueryRegex = new RegExp(searchQuery, 'i')

        // Get matching categories by name or descriptions with limit number per page and sort them by name.
        const matchingCategories = await Category.find({category_name: searchQueryRegex})
            .limit(limit).skip(skip).sort({ 'category_name': -1 });
        const count = matchingCategories.length

        // Check categories existence by it's Id
        if (count < 1) {
            return res.status(404).json({status: 404, message: "Category not found"})
        } else res.status(200).json({ status: 200, count, page, limit, data: matchingCategories })
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get category"})
    }
};

// ******************************* Update category ************************************
const updateCategory = async (req, res) => {
    try {
        // Get category id from request params
        const categoryId = req.params.id; 

        // Check category existence by it's id
        const categoryExist = await Category.findOne({ _id: categoryId });
        if (!categoryExist) {
            return res.status(404).json({
                status: 404,
                message: "Category not found"
            })
        } else {
            // Get category data
            const category_name = req.body.category_name ;

            // Check if the new name is already exists
            const dataExist = await Category.findOne({ category_name });
            if (dataExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Category name is already exists"
                })
            } else {

                // Find category by it's Id and update it
                await Category.findByIdAndUpdate(categoryId, {category_name})
                res.status(200).json({ status: 200, message: "Category updated successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to update category" })
    }   
}

// ******************************* Delete category ************************************
const deleteCategory = async (req, res) => {
    try {
        // Get category Id from request params
        const categoryId = req.params.id;

        // Check existence of category
        const category = await Category.findById(categoryId);

        if (!category) {
            res.status(404).json({ status: 404, message: "Category not found" });
        } else {
            // Find category by it's Id and delete it
            await Category.findByIdAndDelete(categoryId);
            res.status(200).json({ status: 200, message: "Category deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to delete category" })
    }
};


module.exports = {createCategory, getCategories, getCategory, searchCategories, updateCategory, deleteCategory};
