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
        res.status(201).json("Product create successfully")
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

// ******************************* Get one product ***********************************
const getProduct = async (req, res) => {
    try {
        // Get product id from request params
        productId = req.params.id;
        // Find product by it's id
        const product = await Product.findById(productId);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json("Failed to get product")
    }
};

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

module.exports = {createProduct, getProducts, getProduct, deleteProduct};
