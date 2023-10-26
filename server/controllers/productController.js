const Product = require("../models/Product"); // Import product Model
const fs = require('fs'); // Import Filesystem Module

// ******************************* Create product ************************************
const createProduct = async (req, res) => {
    try {
        // Get images files
        const files = req.files;
        // Store images in uploads folder
        files.forEach((file) => {
            const filePath = `public/uploads/${file.filename}`;
            fs.rename(file.path, filePath, (error) => {
                if (error) return res.status(500).json({ error: 'Failed to store the file' })
            })
        }); 
         // Check files occurrence and attach images names to product_images
        const product_images = files.length > 0 ? files.map(file => file.filename) : "default-product-image"
        // Get the product data
        const { sku, product_name, price, discount_price, short_description, long_description,
            options, active, subcategory_id } = req.body;
        // Post product data
        const product = await Product.create({
            sku, product_name, product_images, price, discount_price,
            short_description, long_description, options, active, subcategory_id
        })
        // res.json({ product })
        res.status(201).json("Product created successfully")
    } catch (error) {
        console.log(error);
        res.status(400).json("Failed to create product")
    }   
}

// ****************************** List all products **********************************
const getProducts = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page -1) * limit
        // Get products with limit number per page and sort them by creation date.
        const products = await Product.find().limit(limit).skip(skip).sort({'created_at' : -1});
        res.status(200).json({
            "count": products.length, "page": page,
            "limit": limit, "data": products
        })
    } catch (error) {
        res.status(400).json("Failed to get products")
    }

};

// **************************** Search for a product *********************************
const searchProduct = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page -1) * limit
        // Get search query and add regex
        const searchQuery = req.query.search_query;
        const searchQueryRegex = new RegExp(searchQuery, 'i')
        // Get matching products with limit number per page and sort them by name.
        const matchingProduct = await Product.find(
            {$or: [{product_name: searchQueryRegex}, 
                { short_description: searchQueryRegex },
                { long_description: searchQueryRegex }]
            }
        ).limit(limit).skip(skip).sort({'product_name' : -1});
        res.status(200).json({
            "count": matchingProduct.length, "page": page,
            "limit": limit, "data": matchingProduct
        })
    } catch (error) {
        res.status(400).json("Failed to get product")
        console.log(error);
    }
};

// ******************************* Get one product ***********************************
const getProduct = async (req, res) => {
    try {
        // Get product id from request params
        const productId = req.params.id;
        // Find product by it's id
        const product = await Product.findById(productId);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json("Product not found")
    }
};

// ******************************* Update product ************************************
const updateProduct = async (req, res) => {
    try {
        // Get product id from request params
        const productId = req.params.id;
        // Find product by it's id
        const product = await Product.findById(productId);
        // Get images files
        const files = req.files ;
        // Store images in uploads folder
        files.forEach((file) => {
            const filePath = `public/uploads/${file.filename}`;
            fs.rename(file.path, filePath, (error) => {
                if (error) return res.status(500).json({ error: 'Failed to store the file' })
            })
        }); 
         // Check files occurrence and attach images names to product_images
        const product_images = files.length > 0 ? files.map(file => file.filename) : product.product_images
        // Get the product data
        const price = req.body.price || product.price
        const discount_price = req.body.discount_price || product.discount_price
        const { sku, product_name, short_description, long_description,
            options, active, subcategory_id } = req.body;
        // Set current date to update_at
        const updatedAt = Date.now();
        console.log("data :", {sku, product_name, product_images, price, discount_price, short_description, long_description,
            options, active, updated_at: updatedAt, subcategory_id
        })
        // Find product by it's id and update it
        await Product.findByIdAndUpdate(productId, {sku, product_name, product_images, price, discount_price, short_description, long_description,
            options, active, updated_at: updatedAt, subcategory_id
        })
        res.status(201).json("Product updated successfully")
    } catch (error) {
        console.log(error);
        res.status(400).json("Failed to create product")
    }   
}

// ******************************* Delete product ************************************
const deleteProduct = async (req, res) => {
    try {
        // Get product id from request params
        const productId = req.params.id;
        // Find product by it's id and delete it
        await Product.findByIdAndDelete(productId);
        res.status(200).json("Product deleted successfully")
    } catch (error) {
        res.status(400).json("Failed to delete product")
    }
};

module.exports = {createProduct, getProducts, searchProduct, getProduct, updateProduct, deleteProduct};
